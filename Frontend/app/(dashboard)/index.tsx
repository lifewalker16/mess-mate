import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import { MessageSquare, Utensils, CircleCheck as CheckCircle, Calendar, DollarSign, Clock, Users, Star } from 'lucide-react-native';

export default function HomeScreen() {
  const [mealStatus, setMealStatus] = useState({
    breakfast: false,
    lunch: false,
    dinner: false,
  });
  
  const [messAttendance, setMessAttendance] = useState(false);

  const toggleMealStatus = (meal: 'breakfast' | 'lunch' | 'dinner') => {
    setMealStatus(prev => ({
      ...prev,
      [meal]: !prev[meal]
    }));
  };

  const toggleMessAttendance = () => {
    setMessAttendance(!messAttendance);
    Alert.alert(
      messAttendance ? 'Checked Out' : 'Checked In',
      messAttendance ? 'You have been marked absent for today\'s meals' : 'You have been marked present for today\'s meals'
    );
  };

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.welcomeText}>Good Morning!</Text>
          <Text style={styles.dateText}>{currentDate}</Text>
        </View>

        {/* Quick Status Cards */}
        <View style={styles.statusSection}>
          <Text style={styles.sectionTitle}>Today's Status</Text>
          
          {/* Mess Attendance Card */}
          <TouchableOpacity onPress={toggleMessAttendance}>
            <View style={styles.attendanceCard}>
              <View style={[styles.featureIconContainer, { backgroundColor: messAttendance ? '#10B981' : '#6B7280' }]}>
                <Users size={24} color="#FFFFFF" />
              </View>
              <Text style={styles.featureTitle}>Mess Attendance</Text>
              <Text style={styles.featureSubtitle}>
                {messAttendance ? 'Present for today' : 'Tap to mark attendance'}
              </Text>
            </View>
          </TouchableOpacity>

          {/* Meal Status Cards */}
          <View style={styles.mealStatusContainer}>
            {Object.entries(mealStatus).map(([meal, status]) => (
              <TouchableOpacity
                key={meal}
                onPress={() => toggleMealStatus(meal as 'breakfast' | 'lunch' | 'dinner')}
              >
                <View style={styles.mealCard}>
                  <View style={[
                    styles.featureIconContainer, 
                    { 
                      backgroundColor: status ? 
                        (meal === 'breakfast' ? '#F59E0B' : 
                         meal === 'lunch' ? '#EF4444' : '#8B5CF6') : 
                        '#6B7280' 
                    }
                  ]}>
                    <Utensils size={20} color="#FFFFFF" />
                  </View>
                  <Text style={styles.featureTitle}>
                    {meal.charAt(0).toUpperCase() + meal.slice(1)}
                  </Text>
                  {status && <CheckCircle size={16} color="#10B981" />}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Feature Cards */}
        <View style={styles.featuresSection}>
          <Text style={styles.sectionTitle}>Quick Access</Text>
          
          <View style={styles.featureGrid}>
            <FeatureCard
              icon={Calendar}
              title="View Menu"
              subtitle="Weekly & Daily Menu"
              color="#3B82F6"
              onPress={() => Alert.alert('Menu', 'Navigate to menu section')}
            />
            
            <FeatureCard
              icon={DollarSign}
              title="Expenses"
              subtitle="Track your spending"
              color="#F59E0B"
              onPress={() => Alert.alert('Expenses', 'Navigate to expense tracker')}
            />
            
            <FeatureCard
              icon={MessageSquare}
              title="Feedback"
              subtitle="Share your thoughts"
              color="#10B981"
              onPress={() => Alert.alert('Feedback', 'Navigate to feedback section')}
            />
            
            <FeatureCard
              icon={Star}
              title="Rate Meals"
              subtitle="Rate today's meals"
              color="#8B5CF6"
              onPress={() => Alert.alert('Rate Meals', 'Open meal rating system')}
            />
          </View>
        </View>

        {/* Today's Summary */}
        <View style={styles.summarySection}>
          <Text style={styles.sectionTitle}>Today's Summary</Text>
          
          <View style={styles.summaryCard}>
            <View style={styles.summaryRow}>
              <View style={styles.summaryItem}>
                <Clock size={20} color="#6B7280" />
                <Text style={styles.summaryLabel}>Next Meal</Text>
                <Text style={styles.summaryValue}>Lunch - 1:00 PM</Text>
              </View>
              
              <View style={styles.summaryDivider} />
              
              <View style={styles.summaryItem}>
                <DollarSign size={20} color="#6B7280" />
                <Text style={styles.summaryLabel}>Today's Mess Cost</Text>
                <Text style={styles.summaryValue}>₹75</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

interface FeatureCardProps {
  icon: React.ComponentType<any>;
  title: string;
  subtitle: string;
  color: string;
  onPress: () => void;
}

function FeatureCard({ icon: Icon, title, subtitle, color, onPress }: FeatureCardProps) {
  return (
    <TouchableOpacity style={styles.featureCard} onPress={onPress}>
      <View style={[styles.featureIconContainer, { backgroundColor: color }]}>
        <Icon size={24} color="#FFFFFF" />
      </View>
      <Text style={styles.featureTitle}>{title}</Text>
      <Text style={styles.featureSubtitle}>{subtitle}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 24,
    paddingTop: 16,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  dateText: {
    fontSize: 16,
    color: '#6B7280',
  },
  statusSection: {
    padding: 24,
    paddingTop: 0,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  attendanceCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  mealStatusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mealCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginHorizontal: 4,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  featuresSection: {
    padding: 24,
    paddingTop: 0,
  },
  featureGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    width: '48%',
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  featureIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
    textAlign: 'center',
  },
  featureSubtitle: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  summarySection: {
    padding: 24,
    paddingTop: 0,
    paddingBottom: 32,
  },
  summaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
  },
  summaryDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#E5E7EB',
    marginHorizontal: 16,
  },
  summaryLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 8,
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
});