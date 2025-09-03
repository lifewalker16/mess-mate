import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { DollarSign, TrendingUp, Coffee, Utensils, Cookie, Plus } from 'lucide-react-native';

export default function ExpensesScreen() {
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  
  const totalMessExpense = 450;
  const messBudgetLimit = 800;
  const percentageUsed = (totalMessExpense / messBudgetLimit) * 100;

  const messCategories = [
    { name: 'Regular Meals', amount: 300, icon: Utensils, color: '#FF4500', percentage: 67 },
    { name: 'Extra Items', amount: 100, icon: Cookie, color: '#FF7E5F', percentage: 22 },
    { name: 'Special Meals', amount: 50, icon: Coffee, color: '#F59E0B', percentage: 11 },
  ];

  const recentMessTransactions = [
    { id: 1, description: 'Extra Rice & Dal', amount: 25, date: 'Today', category: 'Extra Items', items: ['Extra Rice', 'Dal'] },
    { id: 2, description: 'Regular Dinner', amount: 50, date: 'Today', category: 'Regular Meals', items: ['Chapati (3)', 'Paneer Curry', 'Rice'] },
    { id: 3, description: 'Special Biryani', amount: 80, date: 'Yesterday', category: 'Special Meals', items: ['Chicken Biryani', 'Raita'] },
    { id: 4, description: 'Regular Lunch', amount: 45, date: 'Yesterday', category: 'Regular Meals', items: ['Rice', 'Dal', 'Vegetable'] },
    { id: 5, description: 'Extra Chapati & Curd', amount: 20, date: '2 days ago', category: 'Extra Items', items: ['Chapati (2)', 'Curd'] },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <DollarSign size={24} color="#FF4500" />
          <Text style={styles.headerTitle}>Mess Expense Tracker</Text>
        </View>

        {/* Period Selector */}
        <View style={styles.periodSelector}>
          {['week', 'month', 'year'].map((period) => (
            <TouchableOpacity
              key={period}
              style={[
                styles.periodButton,
                selectedPeriod === period && styles.periodButtonActive
              ]}
              onPress={() => setSelectedPeriod(period)}
            >
              <Text style={[
                styles.periodButtonText,
                selectedPeriod === period && styles.periodButtonTextActive
              ]}>
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Budget Overview */}
        <View style={styles.budgetCard}>
          <View style={styles.budgetHeader}>
            <Text style={styles.budgetTitle}>Mess Budget - This {selectedPeriod}</Text>
            <TrendingUp size={20} color="#FF4500" />
          </View>
          
          <View style={styles.budgetAmount}>
            <Text style={styles.currentAmount}>₹{totalMessExpense}</Text>
            <Text style={styles.budgetLimit}>/ ₹{messBudgetLimit}</Text>
          </View>
          
          <View style={styles.progressBar}>
            <View 
              style={[styles.progressFill, { width: `${Math.min(percentageUsed, 100)}%`, backgroundColor: '#FF4500' }]} 
            />
          </View>
          
          <Text style={styles.budgetSubtext}>
            {percentageUsed < 80 ? 'Great! You\'re managing mess expenses well' : 'Consider reducing extra items to save money'}
          </Text>
        </View>

        {/* Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mess Categories</Text>
          
          {messCategories.map((category, index) => (
            <View key={index} style={styles.categoryCard}>
              <View style={styles.categoryHeader}>
                <View style={[styles.categoryIcon, { backgroundColor: category.color }]}>
                  <category.icon size={20} color="#FFFFFF" />
                </View>
                <View style={styles.categoryInfo}>
                  <Text style={styles.categoryName}>{category.name}</Text>
                  <Text style={styles.categoryPercentage}>{category.percentage}% of total</Text>
                </View>
                <Text style={styles.categoryAmount}>₹{category.amount}</Text>
              </View>
              
              <View style={styles.categoryProgress}>
                <View 
                  style={[
                    styles.categoryProgressFill, 
                    { width: `${category.percentage}%`, backgroundColor: category.color }
                  ]} 
                />
              </View>
            </View>
          ))}
        </View>

        {/* Recent Transactions */}
        <View style={styles.section}>
          <View style={styles.transactionHeader}>
            <Text style={styles.sectionTitle}>Recent Mess Purchases</Text>
            <TouchableOpacity style={styles.addButton}>
              <Plus size={16} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          
          {recentMessTransactions.map((transaction) => (
            <View key={transaction.id} style={styles.transactionCard}>
              <View style={styles.transactionInfo}>
                <Text style={styles.transactionDescription}>{transaction.description}</Text>
                <Text style={styles.transactionItems}>
                  {transaction.items.join(' • ')}
                </Text>
                <View style={styles.transactionMeta}>
                  <Text style={styles.transactionDate}>{transaction.date}</Text>
                  <Text style={styles.transactionCategory}>• {transaction.category}</Text>
                </View>
              </View>
              <Text style={styles.transactionAmount}>₹{transaction.amount}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
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
  periodSelector: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  periodButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    marginRight: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
  },
  periodButtonActive: {
    backgroundColor: '#FF4500',
    borderColor: '#FF4500',
  },
  periodButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  periodButtonTextActive: {
    color: '#FFFFFF',
  },
  budgetCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  budgetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  budgetTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  budgetAmount: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 16,
  },
  currentAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#111827',
  },
  budgetLimit: {
    fontSize: 16,
    color: '#6B7280',
    marginLeft: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FF4500',
    borderRadius: 4,
  },
  budgetSubtext: {
    fontSize: 14,
    color: '#6B7280',
  },
  section: {
    padding: 24,
    paddingTop: 0,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  categoryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryInfo: {
    flex: 1,
    marginLeft: 12,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  categoryPercentage: {
    fontSize: 12,
    color: '#6B7280',
  },
  categoryAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  categoryProgress: {
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
  },
  categoryProgressFill: {
    height: '100%',
    borderRadius: 2,
  },
  transactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  addButton: {
    backgroundColor: '#FF4500',
    borderRadius: 8,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  transactionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  transactionInfo: {
    flex: 1,
  },
  transactionDescription: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  transactionItems: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  transactionMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  transactionDate: {
    fontSize: 12,
    color: '#6B7280',
  },
  transactionCategory: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
});