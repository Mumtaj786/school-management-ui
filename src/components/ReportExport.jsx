import React from 'react';
import * as XLSX from 'xlsx';
import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: { padding: 20 },
  section: { marginBottom: 10 },
  title: { fontSize: 18, fontWeight: 'bold', textAlign: 'center' },
  table: { display: 'flex', flexDirection: 'row', marginBottom: 5 },
  cell: { flex: 1, borderBottom: '1px solid black', padding: 5 },
});

const ReportExport = ({ reports }) => {
  const generateExcel = () => {
    const excelData = reports.map((r) => ({
      Student: r.student.name,
      Exam: `${r.exam.examName} - ${r.exam.subject}`,
      Marks: r.marks,
    }));
    const ws = XLSX.utils.json_to_sheet(excelData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Reports');
    XLSX.writeFile(wb, 'reports.xlsx');
  };

  const pdfDoc = (
    <Document>
      <Page style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>Student Report</Text>
        </View>
        {reports.map((item, index) => (
          <View key={index} style={styles.table}>
            <Text style={styles.cell}>{item.student.name}</Text>
            <Text style={styles.cell}>{item.exam.subject}</Text>
            <Text style={styles.cell}>{item.marks}</Text>
          </View>
        ))}
      </Page>
    </Document>
  );

  return (
    <div className="mb-3">
      <button className="btn btn-primary mr-2" onClick={generateExcel}>
        Export to Excel
      </button>
      <PDFDownloadLink document={pdfDoc} fileName="report.pdf">
        {({ loading }) => (
          <button className="btn btn-secondary">
            {loading ? 'Generating PDF...' : 'Download PDF'}
          </button>
        )}
      </PDFDownloadLink>
    </div>
  );
};

export default ReportExport;
