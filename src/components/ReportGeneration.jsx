import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import * as XLSX from 'xlsx';

const styles = StyleSheet.create({
  page: { padding: 20 },
  section: { marginBottom: 10 },
  title: { fontSize: 18, fontWeight: 'bold', textAlign: 'center' },
  table: { display: 'flex', flexDirection: 'row', marginBottom: 5 },
  cell: { flex: 1, borderBottom: '1px solid black', padding: 5 },
});

const generateExcel = (data) => {
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Report');
  XLSX.writeFile(wb, 'report.xlsx');
};

const ReportGeneration = ({ data }) => {
  const pdfReport = (
    <Document>
      <Page style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>Student Report</Text>
        </View>
        <View style={styles.section}>
          {data.map((item, index) => (
            <View key={index} style={styles.table}>

              <Text style={styles.cell}>{item.student}</Text>
              <Text style={styles.cell}>{item.subject}</Text>
              <Text style={styles.cell}>{item.marks}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );

  return (
    <div>
      <button className="btn btn-primary" onClick={() => generateExcel(data)}>
        Export to Excel
      </button>
      <PDFDownloadLink document={pdfReport} fileName="report.pdf">
        {({ loading }) => (loading ? 'Generating PDF...' : 'Download PDF')}
      </PDFDownloadLink>
    </div>
  );
};

export default ReportGeneration;
