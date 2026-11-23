import { Stack } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { colors } from "@/constants/colors";

const listaCuriosidades = [
  {
    id: 1,
    numero: "01",
    pergunta: "Origem do nome Guarapuava",
    resposta:
      "Vem do tronco linguístico tupi-guarani: 'Guará' (lobo-guará) e 'Puava' (bravo ou rumor sonoro), significando literalmente 'Lobo Bravo'.",
  },
  {
    id: 2,
    numero: "02",
    pergunta: "Autoria do Hino Municipal",
    resposta:
      "A letra foi composta pela poetisa Gilda Boscardim Todeschini e a melodia pelo maestro Luiz Eulógio Zilli, formalizado como símbolo cívico municipal.",
  },
  {
    id: 3,
    numero: "03",
    pergunta: "O Pinheiro Magistral",
    resposta:
      "A Araucaria angustifolia é o símbolo vegetal maior de Guarapuava, celebrada no hino como imagem de altivez, longevidade e vigor cívico.",
  },
  {
    id: 4,
    numero: "04",
    pergunta: "Capital do Terceiro Planalto",
    resposta:
      "Situada a 1.100 metros de altitude média, Guarapuava destaca-se entre as cidades mais altas e de clima temperado mais ameno do estado do Paraná.",
  },
  {
    id: 5,
    numero: "05",
    pergunta: "Salvaguarda da Partitura Histórica",
    resposta:
      "O manuscrito original da partitura do hino municipal está sob a guarda e preservação permanente do Museu Histórico Visconde de Guarapuava.",
  },
  {
    id: 6,
    numero: "06",
    pergunta: "Polo Global da Cevada e Malte",
    resposta:
      "O município abriga a maior maltaria da América Latina (Cooperativa Agrária), sendo referência internacional no cultivo e beneficiamento de malte cervejeiro.",
  },
  {
    id: 7,
    numero: "07",
    pergunta: "O Majestoso Salto São Francisco",
    resposta:
      "Com 196 metros de queda livre contínua, constitui o maior salto hidrográfico da Região Sul do Brasil, localizado nos limites territoriais de Guarapuava.",
  },
  {
    id: 8,
    numero: "08",
    pergunta: "O Antigo Rocio da Lagoa das Lágrimas",
    resposta:
      "Antes de se tornar o principal parque de convivência central, o espaço era denominado 'Rocio', servindo de parada hídrica e descanso para tropeiros.",
  },
  {
    id: 9,
    numero: "09",
    pergunta: "Rota Estratégica do Tropeirismo",
    resposta:
      "Pela posição geográfica entre os campos de Palmas e o litoral, Guarapuava foi entreposto obrigatório de caravanas comerciais e tropas de mulas no século XIX.",
  },
  {
    id: 10,
    numero: "10",
    pergunta: "A Alcunha de 'Menina Radiante'",
    resposta:
      "Verso consagrado do hino municipal que personifica a cidade, associando a luminosidade do sol aos trigais dourados que enfeitavam as colinas.",
  },
  {
    id: 11,
    numero: "11",
    pergunta: "Belmiro de Miranda e o Abolicionismo",
    resposta:
      "Mestre de obras histórico nascido cativo em 1825, Belmiro comprou a própria alforria trabalhando em horas noturnas e articulou a libertação de mais de 50 escravizados.",
  },
  {
    id: 12,
    numero: "12",
    pergunta: "O Fortim Atalaia de 1810",
    resposta:
      "Construído pela Real Expedição de Conquista liderada por Diogo Pinto de Azevedo Portugal, constituiu o primeiro ponto fortificado de povoamento colonial.",
  },
];

export default function Curiosidades() {
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Você Sabia?",
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
          headerTitleStyle: {
            fontSize: 18,
            fontWeight: "700",
          },
        }}
      />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.responsiveWrapper}>
          
          <View style={styles.headerBlock}>
            <Text style={styles.headerTag}>DOCUMENTAÇÃO HISTÓRICA</Text>
            <Text style={styles.headerTitle}>12 Fatos Sobre Guarapuava</Text>
            <Text style={styles.headerDesc}>
              Aspectos geográficos, cívicos e culturais que fundamentam a identidade do Terceiro Planalto.
            </Text>
          </View>

          {/* LISTA EDITORIAL (SEM CORES DISPERSAS, COM HIERARQUIA COESA) */}
          <View style={styles.listContainer}>
            {listaCuriosidades.map((item, index) => (
              <View key={item.id} style={styles.itemRow}>
                <View style={styles.numberCol}>
                  <Text style={styles.numberText}>{item.numero}</Text>
                </View>
                <View style={styles.contentCol}>
                  <Text style={styles.itemTitle}>{item.pergunta}</Text>
                  <Text style={styles.itemDesc}>{item.resposta}</Text>
                </View>
              </View>
            ))}
          </View>

          <View style={styles.footerNote}>
            <Text style={styles.footerText}>
              Fonte: Acervo Histórico Municipal • ALAC • Museu Visconde de Guarapuava
            </Text>
          </View>

        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingHorizontal: colors.spacing.md,
    paddingTop: colors.spacing.md,
    paddingBottom: colors.spacing.xl,
  },
  responsiveWrapper: {
    width: "100%",
    maxWidth: colors.layout.maxWidth,
    alignSelf: "center",
  },
  headerBlock: {
    marginBottom: colors.spacing.lg,
  },
  headerTag: {
    fontSize: 11,
    fontWeight: "700",
    color: colors.gold,
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: "800",
    color: colors.text,
    letterSpacing: -0.3,
    marginBottom: 6,
  },
  headerDesc: {
    fontSize: 15.5,
    color: colors.textMuted,
    lineHeight: 23,
  },

  /* LISTA */
  listContainer: {
    backgroundColor: colors.card,
    borderRadius: colors.radius,
    borderWidth: 1,
    borderColor: colors.cardBorderSubtle,
    padding: colors.spacing.md,
  },
  itemRow: {
    flexDirection: "row",
    paddingVertical: colors.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.cardBorderSubtle,
    gap: colors.spacing.md,
  },
  numberCol: {
    width: 32,
    alignItems: "flex-start",
    paddingTop: 2,
  },
  numberText: {
    fontSize: 16,
    fontWeight: "800",
    color: colors.gold,
    fontVariant: ["tabular-nums"],
  },
  contentCol: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 4,
  },
  itemDesc: {
    fontSize: 14.5,
    color: colors.textMuted,
    lineHeight: 22,
  },

  /* FOOTER */
  footerNote: {
    paddingTop: colors.spacing.lg,
    alignItems: "center",
  },
  footerText: {
    fontSize: 12,
    color: colors.textSubtle,
    textAlign: "center",
  },
});
