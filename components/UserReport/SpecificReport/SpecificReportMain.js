import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { LineChart, BarChart, PieChart } from 'react-native-chart-kit';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

export default function SpecificReportMain() {
  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("HomeScreen")}>
          <AntDesign name="arrowleft" size={30} color="black" style={{ marginLeft: 10 }} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Test Report</Text>
        <View style={{ width: 30 }} />
      </View>
      <View style={styles.gradeContainer}>
        <Text style={styles.gradeText}>Grade: A</Text>
        <Text style={styles.gradeDesc}>Congratulations! You have achieved an excellent score.</Text>
      </View>

      <View style={styles.analyticsContainer}>
        <Text style={styles.analyticsHeader}>Analytics</Text>

        <Text style={styles.chartHeader}>Cholesterol</Text>
        <BarChart
          data={{
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{ data: [20, 45, 28, 80, 99, 43] }]
          }}
          width={width * 0.85}
          height={220}
          chartConfig={chartConfig}
          style={styles.chart}
        />

        <Text style={styles.chartHeader}>Heart Rate</Text>
        <LineChart
          data={{
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{ data: [60, 65, 70, 75, 80, 85] }]
          }}
          width={width * 0.85}
          height={220}
          chartConfig={chartConfig}
          style={styles.chart}
        />

        <Text style={styles.chartHeader}>Body's Biological Age</Text>
        <LineChart
          data={{
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{ data: [28, 27, 26, 25, 24, 23] }]
          }}
          width={width * 0.85}
          height={220}
          chartConfig={chartConfig}
          style={styles.chart}
        />

        <Text style={styles.chartHeader}>Health Analytics</Text>
        <PieChart
          data={[
            { name: 'Cholesterol', population: 166, color: 'lightblue', legendFontColor: '#7F7F7F', legendFontSize: 15 },
            { name: 'Heart Rate', population: 98, color: 'orange', legendFontColor: '#7F7F7F', legendFontSize: 15 },
          ]}
          width={width * 0.85}
          height={220}
          chartConfig={chartConfig}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
          style={styles.chart}
        />
      </View>
    </ScrollView>
  );
}

const chartConfig = {
  backgroundGradientFrom: '#FFF',
  backgroundGradientTo: '#FFF',
  color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
  strokeWidth: 2,
  barPercentage: 0.5,
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    paddingBottom: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'lightblue',
    width: '100%',
    paddingVertical: height * 0.08,
    paddingHorizontal: width * 0.05,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'relative',
  },
  headerText: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  gradeContainer: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    marginTop: height * 0.03,
    alignItems: 'center',
    width: width * 0.9,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  gradeText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  gradeDesc: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
    marginHorizontal: 20,
  },
  analyticsContainer: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    marginTop: 20,
    width: width * 0.9,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: 'center',
  },
  analyticsHeader: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  chartHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  chart: {
    marginVertical: 10,
  },
});
