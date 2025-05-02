import ReportGeneration from '../components/ReportGeneration';

const sampleData = [
  { studentName: 'John Doe', subject: 'Math', marks: 95 },
  { studentName: 'Jane Smith', subject: 'Science', marks: 89 },
  { studentName: 'Emily Johnson', subject: 'English', marks: 92 },
];

export default function Reports() {
  return (
    <div>
      <h2>Report Generation</h2>
      <ReportGeneration data={sampleData} />
    </div>
  );
}
