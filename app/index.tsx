import * as Haptics from "expo-haptics";
import { Feather, Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { colors } from "@/constants/colors";

export default function Home() {
  const router = useRouter();

  const handleNavigate = (path: any) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push(path);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
          headerTitle: () => (
            <View style={styles.headerTitleContainer}>
              <Image
                source={require("../assets/images/icon.png")}
                style={styles.headerLogo}
              />
              <View>
                <Text style={styles.headerTitleText}>Guará-App</Text>
                <Text style={styles.headerSubtitleText}>Patrimônio Histórico</Text>
              </View>
            </View>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => handleNavigate("/config")}
              style={styles.settingsButton}
              activeOpacity={0.7}
              accessibilityLabel="Sobre o aplicativo"
            >
              <Feather name="info" size={19} color={colors.gold} />
            </TouchableOpacity>
          ),
        }}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.responsiveWrapper}>
          
          {/* HERO SECTION */}
          <View style={styles.heroCard}>
            <View style={styles.badge}>
              <View style={styles.badgeDot} />
              <Text style={styles.badgeText}>GUARAPUAVA • TERRA DO LOBO BRAVO</Text>
            </View>

            <Text style={styles.heroTitle}>Guará-App</Text>
            <Text style={styles.heroSubtitle}>
              Memória, Cidadania e Tradição
            </Text>

            <Text style={styles.heroDescription}>
              Plataforma digital para preservação historiográfica, educação cívica
              e salvaguarda do patrimônio material e imaterial de Guarapuava.
            </Text>

            {/* AÇÕES PRINCIPAIS EQUILIBRADAS (CIVIS E EDUCACIONAIS) */}
            <View style={styles.heroActionCluster}>
              {/* 1. OUVIR O HINO */}
              <TouchableOpacity
                style={styles.primaryActionButton}
                activeOpacity={0.85}
                onPress={() => handleNavigate("/hino")}
              >
                <Ionicons name="play" size={18} color={colors.textDark} style={{ marginRight: 8 }} />
                <Text style={styles.primaryActionText}>OUVIR O HINO MUNICIPAL</Text>
              </TouchableOpacity>

              {/* 2. DUPLA EDUCACIONAL: HISTÓRIA & QUIZ */}
              <View style={styles.heroSecondaryRow}>
                <TouchableOpacity
                  style={styles.educationButton}
                  activeOpacity={0.85}
                  onPress={() => handleNavigate("/historia")}
                >
                  <View style={styles.btnIconCircle}>
                    <Feather name="book-open" size={16} color={colors.gold} />
                  </View>
                  <View style={styles.btnTextCol}>
                    <Text style={styles.educationButtonTitle}>História Oficial</Text>
                    <Text style={styles.educationButtonSub}>Linha do Tempo 1770–1871</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.educationButton}
                  activeOpacity={0.85}
                  onPress={() => handleNavigate("/quiz")}
                >
                  <View style={styles.btnIconCircle}>
                    <Feather name="award" size={16} color={colors.gold} />
                  </View>
                  <View style={styles.btnTextCol}>
                    <Text style={styles.educationButtonTitle}>Desafio Escolar</Text>
                    <Text style={styles.educationButtonSub}>Quiz de Conhecimento</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* SEÇÃO ACERVO HISTÓRICO */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>ACERVO E CULTURA</Text>
            <View style={styles.sectionDivider} />
          </View>

          {/* CARD DESTAQUE: ONTEM E HOJE */}
          <TouchableOpacity
            style={styles.featuredCard}
            activeOpacity={0.85}
            onPress={() => handleNavigate("/fotos")}
          >
            <View style={styles.featuredIconBox}>
              <Feather name="image" size={22} color={colors.gold} />
            </View>
            <View style={styles.featuredBody}>
              <View style={styles.featuredTagRow}>
                <Text style={styles.featuredTag}>ICONOGRAFIA URBANA</Text>
              </View>
              <Text style={styles.featuredTitle}>Ontem e Hoje: Evolução Urbana</Text>
              <Text style={styles.featuredDesc}>
                Comparativo visual dos 5 marcos arquitetônicos fundamentais com registros históricos catalogados.
              </Text>
            </View>
            <Feather name="arrow-right" size={20} color={colors.gold} />
          </TouchableOpacity>

          {/* GRADE ASSIMÉTRICA */}
          <View style={styles.dualGrid}>
            {/* MITOS E TRADIÇÕES */}
            <TouchableOpacity
              style={styles.gridCard}
              activeOpacity={0.85}
              onPress={() => handleNavigate("/lendas")}
            >
              <View style={styles.gridCardHeader}>
                <View style={styles.smallIconBox}>
                  <Feather name="mic" size={18} color={colors.gold} />
                </View>
                <Text style={styles.gridBadge}>ÁUDIO NEURAL</Text>
              </View>
              <Text style={styles.gridCardTitle}>Mitos e Tradições</Text>
              <Text style={styles.gridCardDesc}>
                Belmiro de Miranda, Lagoa das Lágrimas e narrativas orais em áudio de estúdio.
              </Text>
            </TouchableOpacity>

            {/* FATOS E CONQUISTAS (ALINHADO COM A TELA CURIOSIDADES) */}
            <TouchableOpacity
              style={styles.gridCard}
              activeOpacity={0.85}
              onPress={() => handleNavigate("/curiosidades")}
            >
              <View style={styles.gridCardHeader}>
                <View style={styles.smallIconBox}>
                  <Feather name="compass" size={18} color={colors.gold} />
                </View>
                <Text style={styles.gridBadge}>VOCÊ SABIA?</Text>
              </View>
              <Text style={styles.gridCardTitle}>Fatos e Conquistas</Text>
              <Text style={styles.gridCardDesc}>
                Curiosidades sobre a história, símbolos, altitude e a natureza de Guarapuava.
              </Text>
            </TouchableOpacity>
          </View>

          {/* RODAPÉ */}
          <View style={styles.footerContainer}>
            <Text style={styles.footerText}>
              Instituto Histórico de Guarapuava • Preservação e Cidadania Digital
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
    paddingTop: colors.spacing.sm,
    paddingBottom: colors.spacing.xl,
  },
  responsiveWrapper: {
    width: "100%",
    maxWidth: colors.layout.maxWidth,
    alignSelf: "center",
  },

  /* HEADER SUPERIOR ACABADO */
  headerTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  headerLogo: {
    width: 28,
    height: 28,
    borderRadius: colors.radiusSm,
  },
  headerTitleText: {
    fontSize: 16,
    fontWeight: "800",
    color: colors.text,
    letterSpacing: -0.2,
    lineHeight: 18,
  },
  headerSubtitleText: {
    fontSize: 10.5,
    fontWeight: "600",
    color: colors.gold,
    letterSpacing: 0.5,
  },
  settingsButton: {
    width: 38,
    height: 38,
    borderRadius: colors.radius,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.cardBorderSubtle,
    justifyContent: "center",
    alignItems: "center",
    marginRight: colors.spacing.sm,
  },

  /* HERO */
  heroCard: {
    backgroundColor: colors.card,
    borderRadius: colors.radius,
    padding: colors.spacing.lg,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    marginBottom: colors.spacing.lg,
    ...Platform.select({
      web: {
        boxShadow: "0 4px 16px rgba(0,0,0,0.25)",
      },
      default: {
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
      },
    }),
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: colors.goldLight,
    paddingHorizontal: colors.spacing.sm + 2,
    paddingVertical: colors.spacing.xs,
    borderRadius: colors.radiusSm,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    marginBottom: colors.spacing.sm,
  },
  badgeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.gold,
    marginRight: 6,
  },
  badgeText: {
    color: colors.goldBright,
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1.2,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: "800",
    color: colors.text,
    letterSpacing: -0.5,
    marginBottom: 2,
  },
  heroSubtitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.gold,
    marginBottom: colors.spacing.sm,
  },
  heroDescription: {
    fontSize: 15.5,
    color: colors.textMuted,
    lineHeight: 23,
    maxWidth: 580,
    marginBottom: colors.spacing.md,
  },

  /* CLUSTER DE AÇÕES EQUILIBRADO */
  heroActionCluster: {
    gap: colors.spacing.sm,
  },
  primaryActionButton: {
    backgroundColor: colors.gold,
    minHeight: 48,
    borderRadius: colors.radius,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: colors.spacing.md,
  },
  primaryActionText: {
    color: colors.textDark,
    fontWeight: "800",
    fontSize: 14,
    letterSpacing: 0.8,
  },
  heroSecondaryRow: {
    flexDirection: "row",
    gap: colors.spacing.sm,
  },
  educationButton: {
    flex: 1,
    minHeight: 52,
    borderRadius: colors.radius,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    backgroundColor: "rgba(197, 160, 89, 0.05)",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: colors.spacing.sm + 2,
    gap: 8,
  },
  btnIconCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.goldLight,
    justifyContent: "center",
    alignItems: "center",
  },
  btnTextCol: {
    flex: 1,
  },
  educationButtonTitle: {
    color: colors.text,
    fontWeight: "700",
    fontSize: 13.5,
  },
  educationButtonSub: {
    color: colors.textSubtle,
    fontSize: 11,
  },

  /* SEÇÃO ACERVO */
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: colors.spacing.sm,
    marginBottom: colors.spacing.md,
    marginTop: colors.spacing.xs,
  },
  sectionTitle: {
    color: colors.textSubtle,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1.5,
  },
  sectionDivider: {
    flex: 1,
    height: 1,
    backgroundColor: colors.cardBorderSubtle,
  },

  /* BLOCO LARGO */
  featuredCard: {
    backgroundColor: colors.card,
    borderRadius: colors.radius,
    borderWidth: 1,
    borderColor: colors.cardBorderSubtle,
    padding: colors.spacing.md,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: colors.spacing.md,
    gap: colors.spacing.md,
  },
  featuredIconBox: {
    width: 46,
    height: 46,
    borderRadius: colors.radius,
    backgroundColor: colors.goldLight,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    justifyContent: "center",
    alignItems: "center",
  },
  featuredBody: {
    flex: 1,
  },
  featuredTagRow: {
    marginBottom: 3,
  },
  featuredTag: {
    fontSize: 11,
    fontWeight: "700",
    color: colors.gold,
    letterSpacing: 1,
  },
  featuredTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 4,
  },
  featuredDesc: {
    fontSize: 14,
    color: colors.textMuted,
    lineHeight: 20,
  },

  /* GRADE DUPLA */
  dualGrid: {
    flexDirection: "row",
    gap: colors.spacing.md,
    marginBottom: colors.spacing.lg,
  },
  gridCard: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: colors.radius,
    borderWidth: 1,
    borderColor: colors.cardBorderSubtle,
    padding: colors.spacing.md,
    justifyContent: "space-between",
  },
  gridCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: colors.spacing.sm,
  },
  smallIconBox: {
    width: 34,
    height: 34,
    borderRadius: colors.radiusSm,
    backgroundColor: colors.goldLight,
    justifyContent: "center",
    alignItems: "center",
  },
  gridBadge: {
    fontSize: 10,
    fontWeight: "700",
    color: colors.goldBright,
    letterSpacing: 0.8,
  },
  gridCardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 4,
  },
  gridCardDesc: {
    fontSize: 13.5,
    color: colors.textMuted,
    lineHeight: 19,
  },

  /* FOOTER */
  footerContainer: {
    alignItems: "center",
    paddingTop: colors.spacing.sm,
  },
  footerText: {
    fontSize: 12,
    color: colors.textSubtle,
    textAlign: "center",
  },
});
