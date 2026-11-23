import { Stack } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { colors } from "@/constants/colors";

interface CuriosidadeItem {
  id: number;
  numero: string;
  emoji: string;
  pergunta: string;
  resposta: string;
}

const listaCuriosidades: CuriosidadeItem[] = [
  {
    id: 1,
    numero: "#01",
    emoji: "🐺",
    pergunta: "Origem do Nome 'Guarapuava'",
    resposta:
      "Vem do tronco linguístico tupi-guarani: 'Guará' (lobo-guará) e 'Puava' (bravo ou rumor sonoro que ecoa), batizando a terra do 'Lobo Bravo'.",
  },
  {
    id: 2,
    numero: "#02",
    emoji: "🎼",
    pergunta: "Quem escreveu o hino municipal?",
    resposta:
      "A letra foi composta pela poetisa Gilda Boscardim Todeschini e a melodia pelo maestro Luiz Eulógio Zilli, formalizado como símbolo cívico oficial.",
  },
  {
    id: 3,
    numero: "#03",
    emoji: "🌲",
    pergunta: "O 'Pinheiro Magistral'",
    resposta:
      "A Araucaria angustifolia é o símbolo vegetal maior da nossa terra, exaltada no hino como testemunha de longevidade, altivez e força cívica.",
  },
  {
    id: 4,
    numero: "#04",
    emoji: "🏔️",
    pergunta: "Capital do Terceiro Planalto",
    resposta:
      "Situada a 1.100 metros de altitude média, Guarapuava destaca-se entre as cidades de clima temperado mais ameno e maior altitude do Paraná.",
  },
  {
    id: 5,
    numero: "#05",
    emoji: "📜",
    pergunta: "Salvaguarda da Partitura Histórica",
    resposta:
      "O manuscrito original da partitura do hino municipal está sob a guarda e preservação permanente do Museu Histórico Visconde de Guarapuava.",
  },
  {
    id: 6,
    numero: "#06",
    emoji: "🌾",
    pergunta: "Polo Global da Cevada e Malte",
    resposta:
      "O município abriga a maior maltaria da América Latina (Cooperativa Agrária), sendo referência internacional no cultivo e beneficiamento de malte cervejeiro.",
  },
  {
    id: 7,
    numero: "#07",
    emoji: "🌊",
    pergunta: "O Majestoso Salto São Francisco",
    resposta:
      "Com 196 metros de queda livre contínua, constitui o maior salto hidrográfico da Região Sul do Brasil, localizado nos limites territoriais de Guarapuava.",
  },
  {
    id: 8,
    numero: "#08",
    emoji: "💧",
    pergunta: "O Antigo Rocio da Lagoa das Lágrimas",
    resposta:
      "Antes de se transformar no principal parque de convivência central, o espaço era denominado 'Rocio', servindo de parada hídrica para os tropeiros.",
  },
  {
    id: 9,
    numero: "#09",
    emoji: "🐎",
    pergunta: "Rota Estratégica do Tropeirismo",
    resposta:
      "Pela posição geográfica entre os campos de Palmas e o litoral, Guarapuava foi entreposto obrigatório de caravanas comerciais e tropas de mulas no século XIX.",
  },
  {
    id: 10,
    numero: "#10",
    emoji: "✨",
    pergunta: "A Alcunha de 'Menina Radiante'",
    resposta:
      "Verso consagrado do hino municipal que personifica a cidade, associando a luminosidade do sol aos trigais dourados que enfeitavam as colinas.",
  },
  {
    id: 11,
    numero: "#11",
    emoji: "🏛️",
    pergunta: "Belmiro de Miranda e o Abolicionismo",
    resposta:
      "Mestre de obras histórico nascido cativo em 1825, Belmiro comprou a própria alforria trabalhando em horas noturnas e libertou mais de 50 escravizados.",
  },
  {
    id: 12,
    numero: "#12",
    emoji: "🛡️",
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
          title: "Curiosidades",
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
          headerTitleStyle: {
            fontSize: 18,
            fontWeight: "700",
          },
        }}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.responsiveWrapper}>
          
          {/* HEADER INTEGRADO E LIMPO */}
          <View style={styles.headerBlock}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>VOCÊ SABIA?</Text>
            </View>
            <Text style={styles.headerTitle}>Fatos e Conquistas</Text>
            <Text style={styles.headerDesc}>
              Aspectos históricos, geográficos e culturais que fundamentam a
              identidade e o pioneirismo de Guarapuava.
            </Text>
          </View>

          {/* LISTA DE CARTÕES PADRONIZADOS */}
          <View style={styles.cardsList}>
            {listaCuriosidades.map((item) => (
              <View key={item.id} style={styles.curiosidadeCard}>
                <View style={styles.cardHeaderRow}>
                  <View style={styles.iconCircle}>
                    <Text style={styles.iconEmoji}>{item.emoji}</Text>
                  </View>
                  <View style={styles.numberBadge}>
                    <Text style={styles.numberText}>{item.numero}</Text>
                  </View>
                </View>

                <Text style={styles.questionTitle}>{item.pergunta}</Text>
                <Text style={styles.answerText}>{item.resposta}</Text>
              </View>
            ))}
          </View>

          <View style={styles.footerNote}>
            <Text style={styles.footerText}>
              Acervo Histórico Municipal • ALAC • Museu Visconde de Guarapuava
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

  /* HEADER */
  headerBlock: {
    marginBottom: colors.spacing.lg,
  },
  badge: {
    alignSelf: "flex-start",
    backgroundColor: colors.goldLight,
    paddingHorizontal: colors.spacing.sm,
    paddingVertical: colors.spacing.xs,
    borderRadius: colors.radiusSm,
    marginBottom: 6,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: "700",
    color: colors.goldBright,
    letterSpacing: 1.2,
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

  /* CARTÕES UNIFORMES (SEM FUNDOS VERDES OU ALEATÓRIOS) */
  cardsList: {
    gap: colors.spacing.md,
  },
  curiosidadeCard: {
    backgroundColor: colors.card,
    borderRadius: colors.radius,
    borderWidth: 1,
    borderColor: colors.cardBorderSubtle,
    padding: colors.spacing.md,
  },
  cardHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: colors.spacing.sm,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.goldLight,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    justifyContent: "center",
    alignItems: "center",
  },
  iconEmoji: {
    fontSize: 22,
    textAlign: "center",
  },
  numberBadge: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: colors.radiusSm,
  },
  numberText: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.goldBright,
    fontVariant: ["tabular-nums"],
  },
  questionTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 6,
    lineHeight: 22,
  },
  answerText: {
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
