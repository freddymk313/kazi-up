import { Document, Page, View, Text, StyleSheet } from "@react-pdf/renderer";
import { ResumeData, getFullName } from "@/utils/resumeTypes";
import { PdfEmailIcon, PdfPhoneIcon, PdfLocationIcon, PdfWebsiteIcon, PdfLinkedinIcon } from "./PdfIcons";
import { HEADING_FONT, BODY_FONT } from "./pdfFonts";
import { ExperienceItem, EducationItem, SkillsGrid, TwoColumnSection } from "./PDFLayoutComponents";

const accent = "#e07548";
const gray700 = "#374151";
const gray500 = "#6b7280";
const gray400 = "#9ca3af";

// const styles = StyleSheet.create({
//   page: { padding: 44, fontFamily: BODY_FONT, fontSize: 12, color: "#1f2937" },
//   header: { marginBottom: 20 },
//   name: { fontSize: 32, fontFamily: HEADING_FONT, fontWeight: 700, color: accent, letterSpacing: -0.5 },
//   jobTitle: { fontSize: 16, color: gray700, fontFamily: HEADING_FONT, fontWeight: 600, marginTop: 4 },
//   contactRow: { flexDirection: "row", flexWrap: "wrap", gap: 14, marginTop: 12 },
//   contactItem: { fontSize: 10, color: gray500, flexDirection: "row", alignItems: "center", gap: 5 },
//   accentBar: { width: 52, height: 3, backgroundColor: accent, borderRadius: 2, marginBottom: 26 },
//   sectionTitle: { fontSize: 14, fontFamily: HEADING_FONT, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5, color: accent, marginBottom: 12 },
//   sectionBlock: { marginBottom: 26 },
//   summaryText: { fontSize: 11.5, color: gray700, lineHeight: 1.6 },
//   expItem: { marginBottom: 18, paddingLeft: 12, borderLeftWidth: 2, borderLeftColor: accent },
//   expPosition: { fontSize: 14, fontFamily: HEADING_FONT, fontWeight: 700, color: "#1f2937" },
//   expRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 2 },
//   expCompany: { fontSize: 11, color: gray500, fontWeight: 600 },
//   expDate: { fontSize: 10, color: gray400 },
//   bulletRow: { flexDirection: "row", paddingLeft: 8, marginTop: 4 },
//   bulletDot: { fontSize: 11, color: accent, marginRight: 6 },
//   bulletText: { fontSize: 11.5, color: gray700, flex: 1, lineHeight: 1.55 },
//   skillsRow: { flexDirection: "row", flexWrap: "wrap", gap: 6 },
//   skillBadge: { fontSize: 10, backgroundColor: accent, color: "#ffffff", paddingHorizontal: 12, paddingVertical: 5, borderRadius: 10 },
//   twoCol: { flexDirection: "row", gap: 28 },
//   colHalf: { flex: 1 },
//   smallText: { fontSize: 11, color: gray700, lineHeight: 1.55 },
// });

const styles = StyleSheet.create({
  page: { padding: 44, fontFamily: BODY_FONT, fontSize: 10, color: "#1f2937" },

  header: { marginBottom: 18 },

  name: { 
    fontSize: 26, 
    fontFamily: HEADING_FONT, 
    fontWeight: 700, 
    color: accent, 
    letterSpacing: -0.3 
  },

  jobTitle: { 
    fontSize: 12, 
    color: gray700, 
    fontFamily: HEADING_FONT, 
    fontWeight: 600, 
    marginTop: 3 
  },

  contactRow: { 
    flexDirection: "row", 
    flexWrap: "wrap", 
    gap: 10, 
    marginTop: 10 
  },

  contactItem: { 
    fontSize: 9, 
    color: gray500, 
    flexDirection: "row", 
    alignItems: "center", 
    gap: 4 
  },

  accentBar: { 
    width: 40, 
    height: 2, 
    backgroundColor: accent, 
    borderRadius: 2, 
    marginBottom: 20 
  },

  sectionTitle: { 
    fontSize: 12, 
    fontFamily: HEADING_FONT, 
    fontWeight: 700, 
    textTransform: "uppercase", 
    letterSpacing: 1.2, 
    color: accent, 
    marginBottom: 10 
  },

  sectionBlock: { marginBottom: 20 },

  summaryText: { 
    fontSize: 10, 
    color: gray700, 
    lineHeight: 1.5 
  },

  expItem: { 
    marginBottom: 14, 
    paddingLeft: 10, 
    borderLeftWidth: 2, 
    borderLeftColor: accent 
  },

  expPosition: { 
    fontSize: 12, 
    fontFamily: HEADING_FONT, 
    fontWeight: 700, 
    color: "#1f2937" 
  },

  expRow: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center", 
    marginTop: 1 
  },

  expCompany: { 
    fontSize: 10, 
    color: gray500, 
    fontWeight: 600 
  },

  expDate: { 
    fontSize: 9, 
    color: gray400 
  },

  bulletRow: { 
    flexDirection: "row", 
    paddingLeft: 6, 
    marginTop: 3 
  },

  bulletDot: { 
    fontSize: 9, 
    color: accent, 
    marginRight: 5 
  },

  bulletText: { 
    fontSize: 10, 
    color: gray700, 
    flex: 1, 
    lineHeight: 1.5 
  },

  skillsRow: { 
    flexDirection: "row", 
    flexWrap: "wrap", 
    gap: 5 
  },

  skillBadge: { 
    fontSize: 9, 
    backgroundColor: accent, 
    color: "#ffffff", 
    paddingHorizontal: 10, 
    paddingVertical: 4, 
    borderRadius: 8 
  },

  twoCol: { 
    flexDirection: "row", 
    gap: 20 
  },

  colHalf: { flex: 1 },

  smallText: { 
    fontSize: 9.5, 
    color: gray700, 
    lineHeight: 1.5 
  },
});

interface Props { data: ResumeData }

const CreativeAccentPDF = ({ data }: Props) => {
  const { personalInfo, summary, experience, education, skills, languages, certifications } = data;

  return (
    <Document>
      <Page size="A4" style={styles.page} wrap>
        <View style={styles.header}>
          <Text style={styles.name}>{getFullName(personalInfo) || "Your Name"}</Text>
          <Text style={styles.jobTitle}>{personalInfo.jobTitle || "Job Title"}</Text>
          <View style={styles.contactRow}>
            {personalInfo.email && <View style={styles.contactItem}><PdfEmailIcon size={9} /><Text>{personalInfo.email}</Text></View>}
            {personalInfo.phone && <View style={styles.contactItem}><PdfPhoneIcon size={9} /><Text>{personalInfo.phone}</Text></View>}
            {personalInfo.location && <View style={styles.contactItem}><PdfLocationIcon size={9} /><Text>{personalInfo.location}</Text></View>}
            {personalInfo.website && <View style={styles.contactItem}><PdfWebsiteIcon size={9} /><Text>{personalInfo.website}</Text></View>}
            {personalInfo.linkedin && <View style={styles.contactItem}><PdfLinkedinIcon size={9} /><Text>{personalInfo.linkedin}</Text></View>}
          </View>
        </View>

        <View style={styles.accentBar} />

        {summary ? <View style={styles.sectionBlock}><Text style={styles.sectionTitle}>Profile</Text><Text style={styles.summaryText}>{summary}</Text></View> : null}

        {experience.length > 0 ? (
          <View style={styles.sectionBlock}>
            <Text style={styles.sectionTitle}>Experience</Text>
            {experience.map((exp) => (
              <ExperienceItem
                key={exp.id}
                position={exp.position}
                company={exp.company}
                location={exp.location}
                date={`${exp.startDate} — ${exp.currentJob ? "Present" : exp.endDate}`}
                bullets={exp.description?.split("\n").filter(Boolean) || []}
                styles={styles}
              />
            ))}
          </View>
        ) : null}

        {education.length > 0 ? (
          <View style={styles.sectionBlock}>
            <Text style={styles.sectionTitle}>Education</Text>
            {education.map((edu) => (
              <EducationItem
                key={edu.id}
                degree={edu.degree}
                school={edu.school}
                location={edu.location}
                date={`${edu.startDate} — ${edu.endDate}`}
                styles={styles}
              />
            ))}
          </View>
        ) : null}

        {skills.length > 0 ? (
          <View style={styles.sectionBlock}>
            <Text style={styles.sectionTitle}>Skills</Text>
            <SkillsGrid skills={skills} styles={styles} />
          </View>
        ) : null}

        <TwoColumnSection
          leftTitle={languages.length > 0 ? "Languages" : undefined}
          leftContent={languages.length > 0 ? languages.join(", ") : undefined}
          rightTitle={certifications.length > 0 ? "Certifications" : undefined}
          rightContent={certifications.length > 0 ? certifications.join(", ") : undefined}
          styles={styles}
        />
      </Page>
    </Document>
  );
};

export default CreativeAccentPDF;
