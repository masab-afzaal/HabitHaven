import React, { useState, useEffect } from 'react';
import {
  Box, Grid, Card, CardContent, Typography, Button, IconButton,
  CircularProgress, TextField, Dialog, DialogTitle, DialogContent,
  DialogActions, Paper, Chip, Avatar, Alert, Divider, Fab, List,
  ListItem, ListItemAvatar, ListItemText, LinearProgress, Tabs, Tab
} from '@mui/material';
import {
  Groups as GroupsIcon, Add as AddIcon, Close, Refresh, Search,
  People, AdminPanelSettings, Star, ExitToApp,
  EmojiEvents as TrophyIcon, CheckCircle
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import { groupService } from '../services/groupService';
import { groupChallengeService } from '../services/groupChallengeService';
import { shadows } from '../styles';

const GroupComponent = () => {
  const { token, user } = useAuth();

  const [loading, setLoading]               = useState(true);
  const [error, setError]                   = useState('');
  const [allGroups, setAllGroups]           = useState([]);
  const [myGroups, setMyGroups]             = useState([]);
  const [filteredGroups, setFilteredGroups] = useState([]);
  const [searchTerm, setSearchTerm]         = useState('');
  const [activeTab, setActiveTab]           = useState('discover');

  // Create group dialog
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [createLoading, setCreateLoading]       = useState(false);
  const [formData, setFormData]                 = useState({ name: '', description: '' });

  // Details dialog
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [selectedGroup, setSelectedGroup]         = useState(null);
  const [groupDetails, setGroupDetails]           = useState(null);
  const [detailsLoading, setDetailsLoading]       = useState(false);

  // Challenge dialog
  const [openChallengeDialog, setOpenChallengeDialog] = useState(false);
  const [challengeForm, setChallengeForm]             = useState({ title: '', description: '', goal: '', totalDays: '' });
  const [challengeLoading, setChallengeLoading]       = useState(false);

  // ✅ Leaderboard is a simple state array
  const [leaderboard, setLeaderboard] = useState([]);

  // ─── Data fetchers ────────────────────────────────────────────────────────
  const fetchAllGroups = async () => {
    try {
      const result = await groupService.getAllGroups();
      if (result.success) {
        const groups = result.message || result.data || [];
        setAllGroups(Array.isArray(groups) ? groups : []);
        setFilteredGroups(Array.isArray(groups) ? groups : []);
      } else {
        setError(result.error || 'Failed to load groups');
      }
    } catch (err) {
      setError('Failed to load groups');
    }
  };

  const fetchMyGroups = async () => {
    try {
      const result = await groupService.getMyGroups();
      if (result.success) {
        const groups = result.message || result.data || [];
        setMyGroups(Array.isArray(groups) ? groups : []);
      } else {
        setError(result.error || 'Failed to load your groups');
      }
    } catch (err) {
      setError('Failed to load your groups');
    }
  };

  useEffect(() => {
    if (token && user) {
      Promise.all([fetchAllGroups(), fetchMyGroups()]).finally(() => setLoading(false));
    }
  }, [token, user]);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredGroups(allGroups);
    } else {
      const lower = searchTerm.toLowerCase();
      setFilteredGroups(
        allGroups.filter(g =>
          (g.name || '').toLowerCase().includes(lower) ||
          (g.description || '').toLowerCase().includes(lower)
        )
      );
    }
  }, [searchTerm, allGroups]);

  // ─── Handlers ─────────────────────────────────────────────────────────────
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleChallengeInputChange = (e) => {
    const { name, value } = e.target;
    setChallengeForm(prev => ({ ...prev, [name]: value }));
  };

  const handleCreateGroup = async () => {
    if (!formData.name.trim()) { setError('Group name is required'); return; }
    setCreateLoading(true);
    setError('');
    try {
      const result = await groupService.createGroup(formData);
      if (result.success) {
        alert('Group created successfully!');
        setOpenCreateDialog(false);
        setFormData({ name: '', description: '' });
        await Promise.all([fetchAllGroups(), fetchMyGroups()]);
      } else {
        setError(result.error || 'Failed to create group');
      }
    } catch (err) {
      setError('Failed to create group');
    } finally {
      setCreateLoading(false);
    }
  };

  const handleJoinGroup = async (groupId) => {
    if (!groupId) { setError('Invalid group ID'); return; }
    try {
      const result = await groupService.joinGroup(groupId);
      if (result.success) {
        alert('Group joined successfully!');
        setError('');
        await Promise.all([fetchAllGroups(), fetchMyGroups()]);
      } else {
        setError(result.error || 'Failed to join group');
      }
    } catch (err) {
      setError('Failed to join group');
    }
  };

  const handleLeaveGroup = async (groupId) => {
    if (!groupId) { setError('Invalid group ID'); return; }
    if (!window.confirm('Are you sure you want to leave this group?')) return;
    try {
      const result = await groupService.leaveGroup(groupId);
      if (result.success) {
        alert('Left group successfully');
        setError('');
        setOpenDetailsDialog(false);
        await Promise.all([fetchAllGroups(), fetchMyGroups()]);
      } else {
        setError(result.error || 'Failed to leave group');
      }
    } catch (err) {
      setError('Failed to leave group');
    }
  };

  // ✅ THE KEY FUNCTION — fully logged, bulletproof leaderboard fetch
  const handleViewDetails = async (group) => {
    setSelectedGroup(group);
    setOpenDetailsDialog(true);
    setDetailsLoading(true);
    setLeaderboard([]);          // reset first
    setGroupDetails(null);
    setError('');

    try {
      const groupId = group._id || group.groupId?._id;
      console.log('📂 Opening details for groupId:', groupId);

      if (!groupId) {
        setError('Invalid group ID');
        setDetailsLoading(false);
        return;
      }

      const result = await groupService.getGroupDetails(groupId);
      console.log('📂 getGroupDetails result:', JSON.stringify(result, null, 2));

      if (!result.success) {
        setError(result.error || 'Failed to load group details');
        setDetailsLoading(false);
        return;
      }

      const details = result.data;
      console.log('📂 details object:', JSON.stringify(details, null, 2));
      console.log('📂 details.challenge:', details?.challenge);

      // Set details FIRST so dialog renders
      setGroupDetails(details);

      // Now fetch leaderboard if challenge exists
      const challengeId = details?.challenge?._id;
      console.log('🏆 challengeId for leaderboard:', challengeId);

      if (challengeId) {
        const lbResult = await groupChallengeService.getLeaderboard(challengeId);
        console.log('🏆 lbResult:', JSON.stringify(lbResult, null, 2));
        console.log('🏆 lbResult.data:', lbResult.data);
        console.log('🏆 Is array?', Array.isArray(lbResult.data));
        console.log('🏆 Length:', lbResult.data?.length);

        if (lbResult.success && Array.isArray(lbResult.data)) {
          console.log('✅ Setting leaderboard with', lbResult.data.length, 'entries');
          setLeaderboard(lbResult.data);
        } else {
          console.warn('⚠️ lbResult not usable:', lbResult);
          setLeaderboard([]);
        }
      } else {
        console.log('ℹ️ No challenge found, skipping leaderboard fetch');
        setLeaderboard([]);
      }
    } catch (err) {
      console.error('handleViewDetails error:', err);
      setError('Failed to load group details');
    } finally {
      setDetailsLoading(false);
    }
  };

  const handleCreateGroupChallenge = async () => {
    if (!challengeForm.title.trim() || !challengeForm.description.trim() ||
        !challengeForm.goal.trim() || !challengeForm.totalDays) {
      setError('All fields are required');
      return;
    }
    const days = parseInt(challengeForm.totalDays);
    if (isNaN(days) || days < 1) { setError('Total days must be a positive number'); return; }

    setChallengeLoading(true);
    setError('');
    try {
      const groupId = selectedGroup?._id || selectedGroup?.groupId?._id;
      const result = await groupChallengeService.createGroupChallenge({
        ...challengeForm, totalDays: days, groupId
      });
      console.log('✅ createGroupChallenge result:', JSON.stringify(result, null, 2));

      if (result.success) {
        alert('Group challenge created successfully!');
        setOpenChallengeDialog(false);
        setChallengeForm({ title: '', description: '', goal: '', totalDays: '' });

        // result.data = the actual challenge object (from bulletproof service)
        const newChallenge = result.data;
        console.log('✅ newChallenge object:', newChallenge);

        setGroupDetails(prev => ({ ...prev, challenge: newChallenge, participants: [] }));

        if (newChallenge?._id) {
          const lbResult = await groupChallengeService.getLeaderboard(newChallenge._id);
          if (lbResult.success) setLeaderboard(lbResult.data);
        }
      } else {
        setError(result.error || 'Failed to create group challenge');
      }
    } catch (err) {
      console.error('handleCreateGroupChallenge error:', err);
      setError('Failed to create group challenge');
    } finally {
      setChallengeLoading(false);
    }
  };

  const handleUpdateProgress = async () => {
    if (!groupDetails?.challenge?._id) { setError('No active challenge found'); return; }
    try {
      const result = await groupChallengeService.updateProgress(groupDetails.challenge._id);
      if (result.success) {
        alert("Progress updated for today!");
        await handleViewDetails(selectedGroup);
      } else {
        setError(result.error || 'Failed to update progress');
      }
    } catch (err) {
      setError('Failed to update progress');
    }
  };

  const isGroupAdmin = () => {
    if (!groupDetails?.admins || !Array.isArray(groupDetails.admins) || !user) return false;
    return groupDetails.admins.some(a => a.userId === user._id);
  };

  const hasUpdatedToday = () => {
    if (!groupDetails?.participants || !user) return false;
    const participant = groupDetails.participants.find(p => p.userId?._id === user._id);
    if (!participant?.dailyProgress) return false;
    const today = new Date().setHours(0, 0, 0, 0);
    return participant.dailyProgress.some(e => new Date(e.date).setHours(0, 0, 0, 0) === today);
  };

  // ─── Medal colours ────────────────────────────────────────────────────────
  const medalBg    = ['#FFD700', '#C0C0C0', '#CD7F32'];
  const medalBorder = ['#FFA500', '#A9A9A9', '#8B4513'];
  const rowBg      = ['rgba(255,215,0,0.08)', 'rgba(192,192,192,0.08)', 'rgba(205,127,50,0.08)'];
  const rowBgHover = ['rgba(255,215,0,0.15)', 'rgba(192,192,192,0.15)', 'rgba(205,127,50,0.15)'];
  const barGrad    = [
    'linear-gradient(90deg,#FFD700 0%,#FFA500 100%)',
    'linear-gradient(90deg,#C0C0C0 0%,#A9A9A9 100%)',
    'linear-gradient(90deg,#CD7F32 0%,#8B4513 100%)',
    'linear-gradient(90deg,#667eea 0%,#764ba2 100%)',
  ];

  // ─── Loading screen ───────────────────────────────────────────────────────
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
        <CircularProgress />
      </Box>
    );
  }

  const displayGroups = activeTab === 'discover' ? filteredGroups : myGroups;

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>Groups</Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button onClick={() => Promise.all([fetchAllGroups(), fetchMyGroups()])} startIcon={<Refresh />}>
            Refresh
          </Button>
          <Button onClick={() => setOpenCreateDialog(true)} startIcon={<AddIcon />} variant="contained">
            Create Group
          </Button>
        </Box>
      </Box>

      {error && <Alert severity="error" onClose={() => setError('')} sx={{ mb: 3 }}>{error}</Alert>}

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={activeTab === 'discover' ? 0 : 1} onChange={(_, v) => setActiveTab(v === 0 ? 'discover' : 'myGroups')}>
          <Tab label="Discover Groups" />
          <Tab label={`My Groups (${myGroups.length})`} />
        </Tabs>
      </Box>

      {activeTab === 'discover' && (
        <TextField
          fullWidth placeholder="Search groups..." value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{ startAdornment: <Search sx={{ mr: 1 }} /> }}
          sx={{ mb: 3 }}
        />
      )}

      {/* Groups Grid */}
      <Grid container spacing={3}>
        {displayGroups.length === 0 ? (
          <Grid item xs={12}>
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <GroupsIcon sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
              <Typography variant="h6" color="text.secondary">
                {activeTab === 'discover' ? 'No groups found' : 'You have not joined any groups yet'}
              </Typography>
              {activeTab === 'myGroups' && (
                <Button variant="contained" startIcon={<AddIcon />} onClick={() => setActiveTab('discover')} sx={{ mt: 2 }}>
                  Discover Groups
                </Button>
              )}
            </Box>
          </Grid>
        ) : (
          displayGroups.map((group) => {
            const groupObj = activeTab === 'discover' ? group : (group.groupId || group);
            const groupId  = groupObj._id;
            const isMember = activeTab === 'myGroups' || myGroups.some(g => (g.groupId?._id || g._id) === groupId);

            return (
              <Grid item xs={12} sm={6} md={4} key={groupId}>
                <Card sx={{
                  height: '100%', display: 'flex', flexDirection: 'column',
                  transition: 'all 0.3s ease',
                  '&:hover': { transform: 'translateY(-4px)', boxShadow: shadows?.large || 8 }
                }}>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}><GroupsIcon /></Avatar>
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{groupObj.name || 'Unnamed Group'}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          Created {groupObj.createdAt ? new Date(groupObj.createdAt).toLocaleDateString() : 'Unknown'}
                        </Typography>
                      </Box>
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2, minHeight: 40 }}>
                      {groupObj.description || 'No description'}
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Chip icon={<People />} label={`${groupObj.memberCount || 0} members`} size="small"
                        onClick={() => handleViewDetails(group)} sx={{ cursor: 'pointer' }} />
                      {isMember
                        ? <Button size="small" variant="outlined" onClick={() => handleViewDetails(group)}>View Details</Button>
                        : <Button size="small" variant="contained" onClick={() => handleJoinGroup(groupId)}>Join</Button>
                      }
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            );
          })
        )}
      </Grid>

      {/* ── Create Group Dialog ─────────────────────────────────────────── */}
      <Dialog open={openCreateDialog} onClose={() => setOpenCreateDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Create New Group</DialogTitle>
        <DialogContent>
          <TextField autoFocus margin="dense" name="name" label="Group Name" fullWidth
            value={formData.name} onChange={handleInputChange} sx={{ mb: 2, mt: 1 }} />
          <TextField margin="dense" name="description" label="Description" fullWidth multiline rows={4}
            value={formData.description} onChange={handleInputChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCreateDialog(false)}>Cancel</Button>
          <Button onClick={handleCreateGroup} variant="contained" disabled={createLoading || !formData.name.trim()}>
            {createLoading ? 'Creating...' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* ── Group Details Dialog ────────────────────────────────────────── */}
      <Dialog open={openDetailsDialog} onClose={() => setOpenDetailsDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">{groupDetails?.group?.name || 'Group Details'}</Typography>
            <IconButton onClick={() => setOpenDetailsDialog(false)}><Close /></IconButton>
          </Box>
        </DialogTitle>

        <DialogContent>
          {detailsLoading ? (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <CircularProgress />
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>Loading group details...</Typography>
            </Box>
          ) : groupDetails ? (
            <Box>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                {groupDetails.group?.description || 'No description'}
              </Typography>

              {/* Challenge Section */}
              {groupDetails.challenge ? (
                <Box sx={{ mb: 4, p: 3, border: '2px solid', borderColor: 'primary.main', borderRadius: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                    🏆 Group Challenge: {groupDetails.challenge.title}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2 }}>{groupDetails.challenge.description}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    <strong>Goal:</strong> {groupDetails.challenge.goal}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Duration:</strong> {groupDetails.challenge.totalDays} days
                  </Typography>
                  <Box sx={{ mt: 3 }}>
                    <Button variant="contained" startIcon={<CheckCircle />}
                      onClick={handleUpdateProgress} disabled={hasUpdatedToday()} fullWidth>
                      {hasUpdatedToday() ? "✅ Today's Progress Updated" : "Mark Today's Progress Complete"}
                    </Button>
                  </Box>
                </Box>
              ) : isGroupAdmin() ? (
                <Box sx={{ textAlign: 'center', py: 4, border: '2px dashed', borderColor: 'grey.400', borderRadius: 2, mb: 4 }}>
                  <TrophyIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
                  <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>No Group Challenge Yet</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    Create a challenge to motivate your group members!
                  </Typography>
                  <Button variant="contained" size="large" startIcon={<AddIcon />} onClick={() => setOpenChallengeDialog(true)}>
                    Create Group Challenge
                  </Button>
                </Box>
              ) : (
                <Box sx={{ textAlign: 'center', py: 4, bgcolor: 'grey.50', borderRadius: 2, mb: 4 }}>
                  <TrophyIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
                  <Typography color="text.secondary">No group challenge created yet</Typography>
                </Box>
              )}

              {/* Members */}
              <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
                👥 Members ({(groupDetails?.admins?.length || 0) + (groupDetails?.members?.length || 0)})
              </Typography>
              <List sx={{ bgcolor: 'grey.50', borderRadius: 2, p: 1 }}>
                {Array.isArray(groupDetails?.admins) && groupDetails.admins.map(admin => (
                  <ListItem key={admin.userId || Math.random()} sx={{ borderRadius: 1, mb: 0.5, bgcolor: 'white' }}>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: 'primary.main' }}><AdminPanelSettings /></Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="subtitle1" fontWeight="bold">{admin.fullName || 'Unknown Admin'}</Typography>
                          <Chip label="Admin" size="small" color="primary" />
                        </Box>
                      }
                      secondary={`@${admin.username || 'unknown'}`}
                    />
                  </ListItem>
                ))}
                {Array.isArray(groupDetails?.members) && groupDetails.members.map(member => (
                  <ListItem key={member.userId || Math.random()} sx={{ borderRadius: 1, mb: 0.5, bgcolor: 'white' }}>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: 'secondary.main' }}>{member.fullName?.[0]?.toUpperCase() || 'M'}</Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={member.fullName || 'Unknown Member'}
                      secondary={`@${member.username || 'unknown'}`}
                    />
                  </ListItem>
                ))}
                {(!groupDetails?.admins?.length && !groupDetails?.members?.length) && (
                  <Typography color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>No members found</Typography>
                )}
              </List>

              {/* ✅ LEADERBOARD — only shown when challenge exists */}
              {groupDetails.challenge && (
                <>
                  <Divider sx={{ my: 4 }} />

                  {/* Leaderboard header */}
                  <Box sx={{ background: 'linear-gradient(135deg,#667eea 0%,#764ba2 100%)', borderRadius: 3, p: 3, mb: 3 }}>
                    <Typography variant="h5" sx={{ color: 'white', fontWeight: 'bold' }}>
                      🏆 Challenge Leaderboard
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.9)', mt: 1 }}>
                      Track everyone's progress and compete for the top spot!
                    </Typography>
                  </Box>

                  {/* ✅ Debug badge — remove after confirming it works */}
                  <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                    Leaderboard entries loaded: <strong>{leaderboard.length}</strong>
                  </Typography>

                  {leaderboard.length === 0 ? (
                    <Paper sx={{ p: 6, textAlign: 'center', bgcolor: 'grey.50', border: '2px dashed', borderColor: 'grey.300' }}>
                      <TrophyIcon sx={{ fontSize: 80, color: 'grey.400', mb: 2 }} />
                      <Typography variant="h6" color="text.secondary" gutterBottom>No Progress Yet</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Be the first to mark your progress and claim the top spot!
                      </Typography>
                    </Paper>
                  ) : (
                    <Paper sx={{ overflow: 'hidden', boxShadow: 3, borderRadius: 2 }}>
                      {/* Table header */}
                      <Box sx={{
                        display: 'grid', gridTemplateColumns: '80px 1fr 120px 150px 100px',
                        gap: 2, p: 2, bgcolor: 'primary.main'
                      }}>
                        {['Rank','Participant','XP','Progress','Status'].map(h => (
                          <Typography key={h} variant="subtitle2" sx={{ color: 'white', fontWeight: 'bold', textAlign: h === 'Status' ? 'right' : 'left' }}>
                            {h}
                          </Typography>
                        ))}
                      </Box>

                      {/* Table rows */}
                      {leaderboard.map((entry, index) => (
                        <Box key={entry._id || entry.userId || index} sx={{
                          display: 'grid', gridTemplateColumns: '80px 1fr 120px 150px 100px',
                          gap: 2, p: 2, alignItems: 'center',
                          bgcolor: index < 3 ? rowBg[index] : 'white',
                          borderBottom: index < leaderboard.length - 1 ? '1px solid' : 'none',
                          borderColor: 'grey.200',
                          transition: 'all 0.2s',
                          '&:hover': { bgcolor: index < 3 ? rowBgHover[index] : 'grey.50', transform: 'scale(1.01)' }
                        }}>
                          {/* Rank */}
                          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Avatar sx={{
                              width: 45, height: 45,
                              bgcolor: index < 3 ? medalBg[index] : 'primary.main',
                              color: index < 3 ? '#000' : '#fff',
                              fontWeight: 'bold', fontSize: '1.1rem',
                              border: index < 3 ? `3px solid ${medalBorder[index]}` : 'none'
                            }}>
                              {index < 3 ? <TrophyIcon sx={{ fontSize: 28 }} /> : `#${index + 1}`}
                            </Avatar>
                          </Box>

                          {/* Name */}
                          <Box>
                            <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 0.5 }}>
                              {entry.fullName || 'Unknown'}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                              <Typography variant="caption" color="text.secondary">@{entry.username || 'unknown'}</Typography>
                              <Typography variant="caption" color="text.secondary">
                                • Day {entry.currentDay || 0}/{groupDetails.challenge.totalDays}
                              </Typography>
                              {entry.badges?.length > 0 && (
                                <Chip label={`🏅 ${entry.badges.length}`} size="small" color="warning"
                                  sx={{ height: 20, fontSize: '0.7rem' }} />
                              )}
                            </Box>
                          </Box>

                          {/* XP */}
                          <Box>
                            <Chip icon={<Star sx={{ fontSize: 16 }} />} label={`${entry.xp || 0} XP`} size="small"
                              sx={{ fontWeight: 'bold', bgcolor: 'primary.light', color: 'primary.dark' }} />
                          </Box>

                          {/* Progress bar */}
                          <Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <LinearProgress variant="determinate"
                                value={groupDetails.challenge.totalDays > 0
                                  ? Math.min(100, ((entry.progress || 0) / groupDetails.challenge.totalDays) * 100)
                                  : 0}
                                sx={{
                                  flexGrow: 1, height: 10, borderRadius: 2, bgcolor: 'grey.200',
                                  '& .MuiLinearProgress-bar': {
                                    borderRadius: 2,
                                    background: index < 4 ? barGrad[index] : barGrad[3]
                                  }
                                }}
                              />
                              <Typography variant="caption" fontWeight="bold" sx={{ minWidth: 35 }}>
                                {groupDetails.challenge.totalDays > 0
                                  ? Math.round(((entry.progress || 0) / groupDetails.challenge.totalDays) * 100)
                                  : 0}%
                              </Typography>
                            </Box>
                            <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                              {entry.progress || 0}/{groupDetails.challenge.totalDays} days
                            </Typography>
                          </Box>

                          {/* Status */}
                          <Box sx={{ textAlign: 'right' }}>
                            {entry.completed
                              ? <Chip label="Completed" color="success" size="small"
                                  icon={<CheckCircle sx={{ fontSize: 16 }} />} sx={{ fontWeight: 'bold' }} />
                              : <Chip label="In Progress" color="primary" variant="outlined" size="small" />
                            }
                          </Box>
                        </Box>
                      ))}

                      {/* Footer stats */}
                      <Box sx={{
                        p: 2, bgcolor: 'grey.50', borderTop: '1px solid', borderColor: 'grey.300',
                        display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: 2
                      }}>
                        <Box sx={{ textAlign: 'center' }}>
                          <Typography variant="h6" fontWeight="bold" color="primary">{leaderboard.length}</Typography>
                          <Typography variant="caption" color="text.secondary">Total Participants</Typography>
                        </Box>
                        <Box sx={{ textAlign: 'center' }}>
                          <Typography variant="h6" fontWeight="bold" color="success.main">
                            {leaderboard.filter(e => e.completed).length}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">Completed</Typography>
                        </Box>
                        <Box sx={{ textAlign: 'center' }}>
                          <Typography variant="h6" fontWeight="bold" color="warning.main">
                            {leaderboard.length > 0 && groupDetails.challenge.totalDays > 0
                              ? Math.round(
                                  (leaderboard.reduce((s, e) => s + (e.progress || 0), 0) /
                                   (leaderboard.length * groupDetails.challenge.totalDays)) * 100
                                )
                              : 0}%
                          </Typography>
                          <Typography variant="caption" color="text.secondary">Avg Progress</Typography>
                        </Box>
                      </Box>
                    </Paper>
                  )}
                </>
              )}

              {/* Leave group */}
              {Array.isArray(groupDetails?.members) && groupDetails.members.some(m => m.userId === user?._id) && (
                <Box sx={{ mt: 3, textAlign: 'center' }}>
                  <Button variant="outlined" color="error" startIcon={<ExitToApp />}
                    onClick={() => handleLeaveGroup(groupDetails.group?._id)}>
                    Leave Group
                  </Button>
                </Box>
              )}
            </Box>
          ) : (
            <Typography color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>No details available</Typography>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenDetailsDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* ── Create Challenge Dialog ─────────────────────────────────────── */}
      <Dialog open={openChallengeDialog} onClose={() => setOpenChallengeDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <TrophyIcon color="primary" />
            <Typography variant="h6">Create Group Challenge</Typography>
          </Box>
        </DialogTitle>
        <DialogContent>
          <TextField autoFocus margin="dense" name="title" label="Challenge Title"
            placeholder="e.g., 30-Day Fitness Challenge" fullWidth
            value={challengeForm.title} onChange={handleChallengeInputChange} sx={{ mb: 2, mt: 1 }} />
          <TextField margin="dense" name="description" label="Description"
            placeholder="Describe what participants need to do..." fullWidth multiline rows={3}
            value={challengeForm.description} onChange={handleChallengeInputChange} sx={{ mb: 2 }} />
          <TextField margin="dense" name="goal" label="Goal"
            placeholder="e.g., Complete 10,000 steps daily" fullWidth
            value={challengeForm.goal} onChange={handleChallengeInputChange} sx={{ mb: 2 }} />
          <TextField margin="dense" name="totalDays" label="Total Days" type="number"
            placeholder="e.g., 30" fullWidth value={challengeForm.totalDays}
            onChange={handleChallengeInputChange} inputProps={{ min: 1 }}
            helperText="Number of days for this challenge" />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { setOpenChallengeDialog(false); setChallengeForm({ title: '', description: '', goal: '', totalDays: '' }); }}>
            Cancel
          </Button>
          <Button onClick={handleCreateGroupChallenge} variant="contained"
            disabled={challengeLoading || !challengeForm.title.trim() || !challengeForm.description.trim() || !challengeForm.goal.trim() || !challengeForm.totalDays}
            startIcon={challengeLoading ? <CircularProgress size={20} /> : <AddIcon />}>
            {challengeLoading ? 'Creating...' : 'Create Challenge'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* FAB */}
      <Fab color="primary" sx={{ position: 'fixed', bottom: 16, right: 16 }} onClick={() => setOpenCreateDialog(true)}>
        <AddIcon />
      </Fab>
    </Box>
  );
};

export default GroupComponent;  