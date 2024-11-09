import React, { useState, useEffect } from 'react';
import {
  View, Text,
  StyleSheet, ScrollView,
  Dimensions, TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import { LineChart, PieChart } from 'react-native-chart-kit';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import config from '../../frontend/config';

const { width, height } = Dimensions.get('window');

export default function ViewDetailedReport() {
  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params;

  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReport();
  }, []);

  const fetchReport = async () => {
    try {
      const response = await fetch(`${config.urls.REPORTS_API}/specificReport/${id}`);
      const data = await response.json();
      setReport(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!report) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.errorText}>Report not found</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={30} color="black" style={{ marginLeft: 10 }} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Test Report</Text>
        <View style={{ width: 30 }} />
      </View>
      <View style={styles.gradeContainer}>
        <Text style={styles.gradeText}>Grade: {report.grade}</Text>
        <Text style={styles.gradeDesc}>This report has grade {report.grade}</Text>
      </View>

      <View style={styles.analyticsContainer}>
        <Text style={styles.analyticsHeader}>Analytics</Text>

        <Text style={styles.chartHeader}>Score Over Time</Text>
        <LineChart
          data={{
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{ data: [20, 45, 28, 80, 99, 43] }]
          }}
          width={width * 0.85}
          height={220}
          chartConfig={chartConfig}
          style={styles.chart}
        />

        <Text style={styles.chartHeader}>Questions and Answers</Text>
        {report.answers.map((answer, index) => (
          <View key={index} style={styles.answerContainer}>
            <Text style={styles.questionText}>{answer.question.title}</Text>
            <Text style={styles.answerText}>Your Answer: {answer.answer}</Text>
            <Text style={styles.correctAnswerText}>Correct Answer: {answer.question.options[answer.question.correctAnswerIndex]}</Text>
          </View>
        ))}

        <Text style={styles.chartHeader}>Correct vs Incorrect Answers</Text>
        <PieChart
          data={[
            { name: 'Correct', population: report.correctAnswers, color: 'green', legendFontColor: '#7F7F7F', legendFontSize: 15 },
            { name: 'Incorrect', population: report.totalQuestions - report.correctAnswers, color: 'red', legendFontColor: '#7F7F7F', legendFontSize: 15 },
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
  answerContainer: {
    backgroundColor: '#F3F3F3',
    borderRadius: 10,
    padding: 15,
    marginVertical: 5,
    width: width * 0.8,
    alignSelf: 'center',
  },
  answerText: {
    fontSize: 14,
    marginTop: 5,
  },
  correctAnswerText: {
    fontSize: 14,
    marginTop: 5,
    color: 'green',
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
  questionContainer: {
    marginTop: 10,
  },
  questionText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  optionText: {
    fontSize: 14,
    marginLeft: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
});
