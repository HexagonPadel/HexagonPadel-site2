// components/pdf/InvoicePDF.js
import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Styles PDF
const styles = StyleSheet.create({
  page: { padding: 30, fontSize: 12, fontFamily: 'Helvetica' },
  section: { marginBottom: 10 },
  title: { fontSize: 20, marginBottom: 20, textAlign: 'center' },
  tableHeader: { flexDirection: 'row', borderBottom: '1pt solid black', paddingBottom: 4, marginBottom: 4 },
  tableRow: { flexDirection: 'row', marginBottom: 4 },
  col1: { width: '50%' },
  col2: { width: '25%', textAlign: 'right' },
  col3: { width: '25%', textAlign: 'right' },
  bold: { fontWeight: 'bold' },
});

// Composant PDF
const InvoicePDF = ({ clientInfo, panier, total_ht, total_tva, total_ttc, date }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Facture Hexagon Padel</Text>

      {/* Informations vendeur */}
      <View style={styles.section}>
        <Text style={styles.bold}>Hexagon Padel - SARL au capital de 20 000 €</Text>
        <Text>44TER rue du Dr Boutin, 44190 Clisson, France</Text>
        <Text>SIRET : 123 456 789 00012</Text>
        <Text>TVA intracom : FR123456789</Text>
        <Text>RCS Nantes</Text>
      </View>

      {/* Informations client */}
      <View style={styles.section}>
        <Text style={styles.bold}>Client :</Text>
        <Text>{clientInfo.prenom} {clientInfo.nom}</Text>
        <Text>{clientInfo.adresse}, {clientInfo.codePostal} {clientInfo.ville}, {clientInfo.pays}</Text>
        <Text>Email : {clientInfo.email}</Text>
        <Text>Date : {new Date(date).toLocaleDateString()}</Text>
      </View>

      {/* Produits */}
      <View style={styles.section}>
        <View style={styles.tableHeader}>
          <Text style={[styles.col1, styles.bold]}>Produit</Text>
          <Text style={[styles.col2, styles.bold]}>Prix (€)</Text>
          <Text style={[styles.col3, styles.bold]}>Quantité</Text>
        </View>

        {panier.map((item, idx) => (
          <View key={idx} style={styles.tableRow}>
            <Text style={styles.col1}>{item.nom}</Text>
            <Text style={styles.col2}>{item.prix_total.toFixed(2)}</Text>
            <Text style={styles.col3}>1</Text>
          </View>
        ))}
      </View>

      {/* Totaux */}
      <View style={styles.section}>
        <Text>Total HT : {total_ht.toFixed(2)} €</Text>
        <Text>TVA (20%) : {total_tva.toFixed(2)} €</Text>
        <Text style={styles.bold}>Total TTC : {total_ttc.toFixed(2)} €</Text>
      </View>

      {/* Mentions légales */}
      <View style={styles.section}>
        <Text>Conditions de règlement : paiement comptant par carte</Text>
      </View>
    </Page>
  </Document>
);

export default InvoicePDF;