import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Calendar, Clock, Utensils } from 'lucide-react-native';

export default function MenuScreen() {
  const [selectedDay, setSelectedDay] = useState(new Date().getDay());
  
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
  const weeklyMenu = {
    0: { // Sunday
      breakfast: ['Poha', 'Tea/Coffee', 'Banana'],
      lunch: ['Rice', 'Dal', 'Vegetable Curry', 'Curd'],
      dinner: ['Chapati', 'Paneer Curry', 'Rice', 'Pickle']
    },
    1: { // Monday
      breakfast: ['Upma', 'Tea/Coffee', 'Boiled Eggs'],
      lunch: ['Rice', 'Sambar', 'Fry', 'Rasam'],
      dinner: ['Chapati', 'Chicken Curry', 'Rice', 'Salad']
    },
    2: { // Tuesday
      breakfast: ['Idli', 'Sambar', 'Chutney', 'Tea/Coffee'],
      lunch: ['Rice', 'Dal', 'Aloo Gobi', 'Curd'],
      dinner: ['Chapati', 'Fish Curry', 'Rice', 'Papad']
    },
    3: { // Wednesday
      breakfast: ['Dosa', 'Sambar', 'Chutney', 'Tea/Coffee'],
      lunch: ['Rice', 'Rajma', 'Vegetable', 'Buttermilk'],
      dinner: ['Chapati', 'Mixed Veg', 'Rice', 'Pickle']
    },
    4: { // Thursday
      breakfast: ['Paratha', 'Curd', 'Pickle', 'Tea/Coffee'],
      lunch: ['Rice', 'Dal', 'Cabbage Fry', 'Curd'],
      dinner: ['Chapati', 'Egg Curry', 'Rice', 'Salad']
    },
    5: { // Friday
      breakfast: ['Bread', 'Jam/Butter', 'Boiled Eggs', 'Tea/Coffee'],
      lunch: ['Rice', 'Fish Curry', 'Vegetable', 'Rasam'],
      dinner: ['Chapati', 'Chicken Fry', 'Rice', 'Curd']
    },
    6: { // Saturday
      breakfast: ['Puri', 'Aloo Curry', 'Tea/Coffee'],
      lunch: ['Biryani', 'Raita', 'Pickle', 'Sweet'],
      dinner: ['Chapati', 'Dal', 'Mixed Veg', 'Rice']
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Calendar size={24} color="#FF4500" />
          <Text style={styles.headerTitle}>Weekly Menu</Text>
        </View>

        {/* Day Selector */}
        <View style={styles.daySelector}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {days.map((day, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.dayButton,
                  selectedDay === index && styles.dayButtonActive
                ]}
                onPress={() => setSelectedDay(index)}
              >
                <Text style={[
                  styles.dayButtonText,
                  selectedDay === index && styles.dayButtonTextActive
                ]}>
                  {day}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Selected Day Menu */}
        <View style={styles.menuContainer}>
          <Text style={styles.dayTitle}>{dayNames[selectedDay]}'s Menu</Text>
          
          {/* Breakfast */}
          <MealCard
            title="Breakfast"
            time="8:00 AM - 10:00 AM"
            items={weeklyMenu[selectedDay as keyof typeof weeklyMenu].breakfast}
            color="#F59E0B"
          />
          
          {/* Lunch */}
          <MealCard
            title="Lunch"
            time="12:30 PM - 2:30 PM"
            items={weeklyMenu[selectedDay as keyof typeof weeklyMenu].lunch}
            color="#EF4444"
          />
          
          {/* Dinner */}
          <MealCard
            title="Dinner"
            time="7:30 PM - 9:30 PM"
            items={weeklyMenu[selectedDay as keyof typeof weeklyMenu].dinner}
            color="#8B5CF6"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

interface MealCardProps {
  title: string;
  time: string;
  items: string[];
  color: string;
}

function MealCard({ title, time, items, color }: MealCardProps) {
  return (
    <View style={styles.mealCard}>
      <View style={styles.mealHeader}>
        <View style={[styles.mealIcon, { backgroundColor: color }]}>
          <Utensils size={20} color="#FFFFFF" />
        </View>
        <View style={styles.mealInfo}>
          <Text style={styles.mealTitle}>{title}</Text>
          <View style={styles.timeContainer}>
            <Clock size={14} color="#6B7280" />
            <Text style={styles.mealTime}>{time}</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.itemsContainer}>
        {items.map((item, index) => (
          <View key={index} style={styles.menuItem}>
            <View style={styles.itemDot} />
            <Text style={styles.itemText}>{item}</Text>
          </View>
        ))}
      </View>
    </View>
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
    flexDirection: 'row',
    alignItems: 'center',
    padding: 24,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginLeft: 12,
  },
  daySelector: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  dayButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
    marginRight: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  dayButtonActive: {
    backgroundColor: '#FF4500',
    borderColor: '#FF4500',
  },
  dayButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  dayButtonTextActive: {
    color: '#FFFFFF',
  },
  menuContainer: {
    padding: 24,
    paddingTop: 0,
  },
  dayTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  mealCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  mealHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  mealIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mealInfo: {
    marginLeft: 16,
    flex: 1,
  },
  mealTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mealTime: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 4,
  },
  itemsContainer: {
    marginLeft: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  itemDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#D1D5DB',
    marginRight: 12,
  },
  itemText: {
    fontSize: 14,
    color: '#374151',
  },
});