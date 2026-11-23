import * as Haptics from "expo-haptics";
import { Feather } from "@expo/vector-icons";
import { Stack } from "expo-router";
import React from "react";
import {
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { colors } from "@/constants/colors";

export default function Config() {
  const version = "1.2.0";
  const devName = "Leonardo Hirt Moraes";

  const abrirLink = (url: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Sobre o Aplicativo",
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
          
          {/* HEADER / IDENTIDADE DO APP */}
          <View style={styles.heroCard}>
            <View style={styles.logoContainer}>
              <Image
                source={require("../assets/images/icon.png")}
                style={styles.logo}
              />
            </View>
            <Text style={styles.appName}>Guará-App</Text>
            <View style={styles.versionBadge}>
              <Text style={styles.versionBadgeText}>VERSÃO {version} • PRODUÇÃO OFICIAL</Text>
            </View>
            <Text style={styles.appSubtitle}>
              Plataforma de salvaguarda historiográfica, difusão cívica e educação
              patrimonial de Guarapuava — PR.
            </Text>
          </View>

          {/* CRÉDITOS HISTÓRICOS & CURADORIA (DESTAQUE MÁXIMO DE CREDIBILIDADE) */}
          <View style={styles.section}>
            <View style={styles.sectionBadgeRow}>
              <View style={styles.institutionalBadge}>
                <Text style={styles.institutionalBadgeText}>SALVAGUARDA & CURADORIA HISTÓRICA</Text>
              </View>
            </View>
            
            <View style={styles.institutionalCard}>
              <View style={styles.creditItem}>
                <View style={styles.creditIconBox}>
                  <Feather name="feather" size={18} color={colors.gold} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.creditRole}>Letra do Hino Municipal</Text>
                  <Text style={styles.creditName}>Gilda Boscardim Todeschini</Text>
                  <Text style={styles.creditDetail}>
                    Composição poética oficial exaltando os campos, os trigais e a força pioneira.
                  </Text>
                </View>
              </View>

              <View style={styles.creditDivider} />

              <View style={styles.creditItem}>
                <View style={styles.creditIconBox}>
                  <Feather name="music" size={18} color={colors.gold} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.creditRole}>Música e Regência Oficial</Text>
                  <Text style={styles.creditName}>Maestro Luiz Eulógio Zilli</Text>
                  <Text style={styles.creditDetail}>
                    Arranjo sinfônico tradicional adotado em solenidades cívicas do município.
                  </Text>
                </View>
              </View>

              <View style={styles.creditDivider} />

              <View style={styles.creditItem}>
                <View style={styles.creditIconBox}>
                  <Feather name="archive" size={18} color={colors.gold} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.creditRole}>Acervo Iconográfico & Partitura</Text>
                  <Text style={styles.creditName}>Museu Municipal Visconde de Guarapuava</Text>
                  <Text style={styles.creditDetail}>
                    Salvaguarda do manuscrito da partitura e registros fotográficos da fundação de 1819.
                  </Text>
                </View>
              </View>

              <View style={styles.creditDivider} />

              <View style={styles.creditItem}>
                <View style={styles.creditIconBox}>
                  <Feather name="book-open" size={18} color={colors.gold} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.creditRole}>Pesquisa Histórica & Biografias</Text>
                  <Text style={styles.creditName}>ALAC (Academia de Letras, Artes e Ciências)</Text>
                  <Text style={styles.creditDetail}>
                    Resgate da trajetória do abolicionista Belmiro de Miranda e tradição oral.
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* DESENVOLVEDOR & CÓDIGO DO PROJETO (REPOSITÓRIO EM PRIMEIRO PLANO) */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>ENGENHARIA & CÓDIGO-FONTE</Text>
            <View style={styles.card}>
              <View style={styles.devRow}>
                <View style={styles.avatarBadge}>
                  <Feather name="code" size={18} color={colors.gold} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.devLabel}>Desenvolvido por:</Text>
                  <Text style={styles.devName}>{devName}</Text>
                  <Text style={styles.devAcademic}>
                    Graduando em Sistemas para Internet • UTFPR Campus Guarapuava
                  </Text>
                </View>
              </View>

              <View style={styles.linksContainer}>
                {/* REPOSITÓRIO COM DESTAQUE PRIMÁRIO */}
                <TouchableOpacity
                  style={styles.primaryProjectButton}
                  activeOpacity={0.85}
                  onPress={() =>
                    abrirLink("https://github.com/leonardohirt/APP-Guarapuava")
                  }
                >
                  <Feather name="github" size={18} color={colors.textDark} style={{ marginRight: 8 }} />
                  <Text style={styles.primaryProjectButtonText}>Repositório Oficial do Guará-App</Text>
                </TouchableOpacity>

                {/* PERFIL COM DESTAQUE SECUNDÁRIO */}
                <TouchableOpacity
                  style={styles.secondaryProfileButton}
                  activeOpacity={0.8}
                  onPress={() => abrirLink("https://github.com/leonardohirt")}
                >
                  <Feather name="user" size={16} color={colors.text} style={{ marginRight: 8 }} />
                  <Text style={styles.secondaryProfileButtonText}>Perfil do Desenvolvedor no GitHub</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* ESPECIFICAÇÕES TÉCNICAS */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>ARQUITETURA DE PRODUTO</Text>
            <View style={styles.card}>
              <View style={styles.featureRow}>
                <Feather name="check" size={16} color={colors.gold} style={{ marginRight: 10 }} />
                <Text style={styles.featureText}>100% Autônomo e Operação Offline (Zero consumo de dados)</Text>
              </View>
              <View style={styles.featureRow}>
                <Feather name="check" size={16} color={colors.gold} style={{ marginRight: 10 }} />
                <Text style={styles.featureText}>Áudios e narrações neurais de alta fidelidade integrados</Text>
              </View>
              <View style={styles.featureRow}>
                <Feather name="check" size={16} color={colors.gold} style={{ marginRight: 10 }} />
                <Text style={styles.featureText}>Respostas táteis com retorno háptico nativo</Text>
              </View>
              <View style={styles.featureRow}>
                <Feather name="check" size={16} color={colors.gold} style={{ marginRight: 10 }} />
                <Text style={styles.featureText}>Armazenamento seguro de pontuações via AsyncStorage</Text>
              </View>
            </View>
          </View>

          <View style={styles.footerContainer}>
            <Text style={styles.footerText}>
              Guará-App • Guarapuava - Paraná • 2026
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
  heroCard: {
    backgroundColor: colors.card,
    borderRadius: colors.radius,
    padding: colors.spacing.lg,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.cardBorderSubtle,
    marginBottom: colors.spacing.lg,
  },
  logoContainer: {
    width: 72,
    height: 72,
    borderRadius: colors.radius,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderWidth: 1,
    borderColor: colors.cardBorderSubtle,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: colors.spacing.sm,
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: colors.radiusSm,
  },
  appName: {
    fontSize: 24,
    fontWeight: "800",
    color: colors.text,
    letterSpacing: -0.3,
  },
  versionBadge: {
    backgroundColor: colors.goldLight,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: colors.radiusSm,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    marginTop: 6,
    marginBottom: colors.spacing.sm,
  },
  versionBadgeText: {
    color: colors.goldBright,
    fontSize: 10.5,
    fontWeight: "700",
    letterSpacing: 1,
  },
  appSubtitle: {
    fontSize: 14.5,
    color: colors.textMuted,
    textAlign: "center",
    lineHeight: 22,
    maxWidth: 520,
  },

  section: {
    marginBottom: colors.spacing.lg,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: "700",
    color: colors.gold,
    letterSpacing: 1.5,
    marginBottom: colors.spacing.sm,
  },
  sectionBadgeRow: {
    marginBottom: 8,
  },
  institutionalBadge: {
    alignSelf: "flex-start",
    backgroundColor: colors.goldLight,
    paddingHorizontal: colors.spacing.sm,
    paddingVertical: colors.spacing.xs,
    borderRadius: colors.radiusSm,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  institutionalBadgeText: {
    color: colors.goldBright,
    fontSize: 10.5,
    fontWeight: "800",
    letterSpacing: 1.2,
  },
  institutionalCard: {
    backgroundColor: colors.card,
    borderRadius: colors.radius,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    padding: colors.spacing.md,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: colors.radius,
    borderWidth: 1,
    borderColor: colors.cardBorderSubtle,
    padding: colors.spacing.md,
  },

  /* DESENVOLVEDOR */
  devRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: colors.spacing.md,
    gap: colors.spacing.md,
  },
  avatarBadge: {
    width: 38,
    height: 38,
    borderRadius: colors.radiusSm,
    backgroundColor: colors.goldLight,
    justifyContent: "center",
    alignItems: "center",
  },
  devLabel: {
    fontSize: 12,
    color: colors.textSubtle,
    marginBottom: 2,
  },
  devName: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 2,
  },
  devAcademic: {
    fontSize: 13,
    color: colors.textMuted,
    lineHeight: 18,
  },
  linksContainer: {
    gap: colors.spacing.sm,
  },
  primaryProjectButton: {
    backgroundColor: colors.gold,
    minHeight: 48,
    borderRadius: colors.radius,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: colors.spacing.md,
  },
  primaryProjectButtonText: {
    color: colors.textDark,
    fontSize: 14,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  secondaryProfileButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: colors.cardBorderSubtle,
    minHeight: 44,
    borderRadius: colors.radius,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: colors.spacing.md,
  },
  secondaryProfileButtonText: {
    color: colors.text,
    fontSize: 13.5,
    fontWeight: "600",
  },

  /* CRÉDITOS INSTITUCIONAIS */
  creditItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: colors.spacing.md,
    paddingVertical: 4,
  },
  creditIconBox: {
    width: 36,
    height: 36,
    borderRadius: colors.radiusSm,
    backgroundColor: colors.goldLight,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 2,
  },
  creditRole: {
    fontSize: 11.5,
    fontWeight: "700",
    color: colors.gold,
    letterSpacing: 0.8,
    textTransform: "uppercase",
    marginBottom: 1,
  },
  creditName: {
    fontSize: 15.5,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 2,
  },
  creditDetail: {
    fontSize: 13.5,
    color: colors.textMuted,
    lineHeight: 19,
  },
  creditDivider: {
    height: 1,
    backgroundColor: colors.cardBorderSubtle,
    marginVertical: colors.spacing.md,
  },

  /* ESPECIFICAÇÕES */
  featureRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
  },
  featureText: {
    fontSize: 14,
    color: colors.textMuted,
  },

  footerContainer: {
    paddingTop: colors.spacing.md,
    alignItems: "center",
  },
  footerText: {
    fontSize: 12,
    color: colors.textSubtle,
    textAlign: "center",
  },
});
