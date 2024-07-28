import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity, Alert } from 'react-native';
import { LineChart, PieChart } from 'react-native-chart-kit';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import config from '../../../frontend/config';
import { useAuth } from '../../../frontend/context/AuthContext';
import { Button } from 'react-native-paper';

const { width, height } = Dimensions.get('window');

const chartConfig = {
  backgroundGradientFrom: '#FFF',
  backgroundGradientTo: '#FFF',
  color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
  strokeWidth: 2,
  barPercentage: 0.5,
};

const getGradeColor = (grade) => {
  switch (grade) {
    case 'A':
      return '#4CAF50'; // Green
    case 'B':
      return '#8BC34A'; // Light Green
    case 'C':
      return '#FFC107'; // Amber
    case 'D':
      return '#FF9800'; // Orange
    case 'F':
      return '#f78f8f'; // Red
    default:
      return '#607D8B'; // Blue Grey for unknown grades
  }
};

export default function SpecificReportMain() {
  const { token } = useAuth();
  const navigation = useNavigation();
  const route = useRoute();
  const [report, setReport] = useState(null);
  const { reportId } = route.params;

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await fetch(`${config.urls.REPORTS_API}/specificReport/${reportId}`, {
          headers: {
            "token": token
          }
        });
        const data = await response.json();
        if (response.ok) {
          setReport(data);
        } else {
          Alert.alert('Error', data.message);
        }
      } catch (error) {
        console.error('Error fetching report:', error);
        Alert.alert('Error', 'Failed to fetch the report');
      }
    };

    fetchReport();
  }, [reportId, token]);

  const handleDeleteReport = async () => {
    try {
      const response = await fetch(`${config.urls.REPORTS_API}/deleteReport/${reportId}`, {
        method: 'DELETE',
        headers: {
          "token": token
        }
      });
      const data = await response.json();
      if (response.ok) {
        Alert.alert('Success', 'Report deleted successfully', [
          {
            text: 'OK',
            onPress: () => navigation.navigate('HomeScreen')
          }
        ]);
      } else {
        Alert.alert('Error', data.message);
      }
    } catch (error) {
      console.error('Error deleting report:', error);
      Alert.alert('Error', 'Failed to delete the report');
    }
  };

  if (!report) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const scoreData = {
    labels: report.answers.map((_, index) => `Q${index + 1}`),
    datasets: [
      {
        data: report.answers.map(answer => answer.answer === answer.question.options[answer.question.correctAnswerIndex] ? 1 : 0),
      }
    ]
  };

  const correctAnswers = report.answers.filter(answer => answer.answer === answer.question.options[answer.question.correctAnswerIndex]).length;
  const incorrectAnswers = report.answers.length - correctAnswers;

  const pieData = [
    { name: 'Correct', population: correctAnswers, color: '#4CAF50', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { name: 'Incorrect', population: incorrectAnswers, color: '#F44336', legendFontColor: '#7F7F7F', legendFontSize: 15 },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("TestReports")}>
          <AntDesign name="arrowleft" size={30} color="black" style={{ marginLeft: 10 }} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Report Statistics</Text>
      </View>
      <Button
        mode="contained"
        style={styles.voidButton}
        onPress={() => Alert.alert(
          'Confirm Delete',
          'Are you sure you want to void this report?',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Void', style: 'destructive', onPress: handleDeleteReport }
          ]
        )}
      >
        Void Report
      </Button>
      <View style={[styles.gradeContainer, { backgroundColor: getGradeColor(report.grade) }]}>
        <Text style={styles.gradeText}>Grade: {report.grade}</Text>
        <Text style={styles.gradeDesc}>Score: {report.score}</Text>
        <Text style={styles.gradeDesc}>Percentage: {report.percentage}%</Text>
        <Text style={styles.gradeDesc}>Attempt Date: {new Date(report.attemptDate).toLocaleDateString()}</Text>
      </View>

      <View style={styles.analyticsContainer}>
        <Text style={[styles.chartHeader, { textAlign: "center" }]}>
          {report.test.title}
        </Text>
        <Text style={styles.chartHeader}>Description</Text>
        <Text>{report.test.description}</Text>

        <Text style={styles.chartHeader}>Score Progression</Text>
        <LineChart
          data={scoreData}
          width={width * 0.85}
          height={220}
          chartConfig={chartConfig}
          style={styles.chart}
        />

        <Text style={[styles.chartHeader, { textAlign: "center" }]}>Answers</Text>
        {report.answers.map((answer, index) => (
          <View key={index} style={styles.answerContainer}>
            <Text style={styles.questionText}>{answer.question.title}</Text>
            <Text style={styles.answerText}>Your Answer: {answer.answer}</Text>
            <Text style={styles.correctAnswerText}>Correct Answer: {answer.question.options[answer.question.correctAnswerIndex]}</Text>
          </View>
        ))}

        <Text style={styles.chartHeader}>Answer Distribution</Text>
        <PieChart
          data={pieData}
          width={width * 0.85}
          height={220}
          chartConfig={chartConfig}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="10"
          absolute
          style={styles.chart}
        />
      </View>
    </ScrollView>
  );
}

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
  voidButton: {
    backgroundColor: '#FF5722',
    marginTop: 10,
    marginBottom: -10,
    alignSelf: 'flex-end',
    marginRight: 15
  },
  gradeContainer: {
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
    marginTop: 15,
    width: width * 0.9,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    // alignItems: 'center',
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
    textTransform: "capitalize"
  },
  chart: {
    marginVertical: 10,
  },
  answerContainer: {
    backgroundColor: '#F3F3F3',
    borderRadius: 10,
    padding: 10,
    marginVertical: 5
  },
  questionText: {
    fontSize: 16,
    fontWeight: 'bold',
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
});
