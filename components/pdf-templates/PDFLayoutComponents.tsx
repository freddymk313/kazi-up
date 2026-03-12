import { View, Text, StyleSheet } from "@react-pdf/renderer";
import { ReactNode } from "react";

/**
 * Reusable PDF Layout Components
 * These components ensure consistent page wrapping and prevent sections from being cut mid-page
 */

interface ResumeSectionProps {
  title: string;
  children: ReactNode;
  styles: any;
}

/**
 * ResumeSection: Wraps section content to prevent splitting across pages
 * - Keep the section title attached to content
 * - Never split the section in the middle
 */
export const ResumeSection = ({ title, children, styles }: ResumeSectionProps) => (
  <View style={[styles.sectionBlock, { breakInside: "avoid" }]} wrap={false}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <View style={styles.sectionContent}>{children}</View>
  </View>
);

interface BulletItemProps {
  text: string;
  styles: any;
}

/**
 * BulletItem: Renders a single bullet point as a non-wrappable block
 * - Prevents bullets from splitting between pages
 * - Maintains consistent formatting
 */
export const BulletItem = ({ text, styles }: BulletItemProps) => (
  <View style={[styles.bulletRow]} wrap={false}>
    <Text style={styles.bulletDot}>•</Text>
    <Text style={styles.bulletText}>{text}</Text>
  </View>
);

interface PDFPageLayoutProps {
  children: ReactNode;
  style: any;
}

/**
 * PDFPageLayout: Main page container with proper wrapping enabled
 * - Allows sections to flow to next page automatically
 * - Maintains margins and consistent styling
 */
export const PDFPageLayout = ({ children, style }: PDFPageLayoutProps) => (
  <View style={style} wrap>
    {children}
  </View>
);

interface ExperienceItemProps {
  position: string;
  company: string;
  location?: string;
  date: string;
  bullets: string[];
  styles: any;
}

/**
 * ExperienceItem: Renders experience entry with proper page break handling
 * - Keeps position, company, and bullets together
 * - Prevents splitting job description mid-bullet
 */
export const ExperienceItem = ({
  position,
  company,
  location,
  date,
  bullets,
  styles,
}: ExperienceItemProps) => (
  <View style={[styles.expItem, { breakInside: "avoid" }]} wrap={false}>
    <View style={styles.expHeader}>
      <View style={{ flex: 1 }}>
        <Text style={styles.expPosition}>{position}</Text>
        <Text style={styles.expCompany}>
          {company}
          {location ? `, ${location}` : ""}
        </Text>
      </View>
      <Text style={styles.expDate}>{date}</Text>
    </View>
    {bullets.map((bullet, i) => (
      <BulletItem key={i} text={bullet} styles={styles} />
    ))}
  </View>
);

interface EducationItemProps {
  degree: string;
  school: string;
  location?: string;
  date: string;
  styles: any;
}

/**
 * EducationItem: Renders education entry with proper page break handling
 * - Keeps degree and school together
 * - Never splits education entry
 */
export const EducationItem = ({
  degree,
  school,
  location,
  date,
  styles,
}: EducationItemProps) => (
  <View style={[styles.eduItem || { marginBottom: 14 }, { breakInside: "avoid" }]} wrap={false}>
    <View style={styles.expHeader || { flexDirection: "row", justifyContent: "space-between" }}>
      <View style={{ flex: 1 }}>
        <Text style={styles.expPosition}>{degree}</Text>
        <Text style={styles.expCompany}>
          {school}
          {location ? `, ${location}` : ""}
        </Text>
      </View>
      <Text style={styles.expDate}>{date}</Text>
    </View>
  </View>
);

interface SkillsGridProps {
  skills: string[];
  styles: any;
}

/**
 * SkillsGrid: Renders skills with proper wrapping
 * - Allows skills to wrap to next page naturally
 * - Maintains consistent styling
 */
export const SkillsGrid = ({ skills, styles }: SkillsGridProps) => (
  <View style={styles.skillsRow || { flexDirection: "row", flexWrap: "wrap", gap: 6 }}>
    {skills.map((skill, i) => (
      <Text key={i} style={styles.skillBadge || { fontSize: 10 }}>
        {skill}
      </Text>
    ))}
  </View>
);

interface TwoColumnSectionProps {
  leftTitle?: string;
  leftContent?: string;
  rightTitle?: string;
  rightContent?: string;
  styles: any;
}

/**
 * TwoColumnSection: Renders two-column layout (e.g., Languages & Certifications)
 * - Keeps columns together on same page
 * - Proper spacing and formatting
 */
export const TwoColumnSection = ({
  leftTitle,
  leftContent,
  rightTitle,
  rightContent,
  styles,
}: TwoColumnSectionProps) => (
  <View style={[styles.twoCol, { breakInside: "avoid" }]} wrap={false}>
    {leftTitle && (
      <View style={styles.colHalf}>
        <Text style={styles.sectionTitle}>{leftTitle}</Text>
        <Text style={styles.smallText}>{leftContent}</Text>
      </View>
    )}
    {rightTitle && (
      <View style={styles.colHalf}>
        <Text style={styles.sectionTitle}>{rightTitle}</Text>
        <Text style={styles.smallText}>{rightContent}</Text>
      </View>
    )}
  </View>
);
