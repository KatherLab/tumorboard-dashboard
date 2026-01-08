import type { Case } from '../types'

export const dummyCases: Case[] = [
  {
    id: 'case-001',
    patientHistory: `Patient: 62-year-old male, former smoker (40 pack-year history, quit 5 years ago)

Chief Complaint: Persistent cough and hemoptysis for 6 weeks, unintentional weight loss of 15 lbs over 3 months.

History of Present Illness: The patient presented with a productive cough that has progressively worsened over the past 6 weeks. He reports intermittent blood-streaked sputum. Associated symptoms include mild dyspnea on exertion and right-sided chest discomfort. He denies fever, night sweats, or recent infections. His appetite has decreased significantly, correlating with the weight loss.

Past Medical History: Hypertension (well-controlled on lisinopril), Type 2 Diabetes Mellitus (managed with metformin), COPD (uses albuterol PRN).

Diagnostic Workup:
- CT Chest: 4.2 cm spiculated mass in the right upper lobe with mediastinal lymphadenopathy (stations 4R and 7)
- PET-CT: FDG-avid primary lesion (SUVmax 12.4) and mediastinal nodes (SUVmax 8.2). No distant metastases identified.
- CT-guided biopsy: Adenocarcinoma of the lung
- Molecular testing: EGFR negative, ALK negative, ROS1 negative, KRAS G12C positive, PD-L1 TPS 45%
- Brain MRI: No evidence of intracranial metastases
- Pulmonary function tests: FEV1 72% predicted, DLCO 68% predicted

Staging: Clinical Stage IIIA (T2bN2M0)

ECOG Performance Status: 1

The patient is seeking guidance on optimal treatment approach. He is motivated to pursue aggressive treatment and has good family support.`,
    groundTruth: `Recommend concurrent chemoradiation with cisplatin/etoposide and 60 Gy thoracic radiation, followed by durvalumab consolidation for 12 months given PD-L1 positivity. KRAS G12C mutation noted for potential targeted therapy if progression occurs.`,
    aiOutput: {
      reasoningTrace: `Analyzing case presentation:
1. Patient demographics: 62-year-old male, former heavy smoker - consistent with typical NSCLC presentation
2. Clinical staging: IIIA based on T2b (>4cm, ≤5cm) and N2 (ipsilateral mediastinal involvement)
3. Histology: Adenocarcinoma - most common NSCLC subtype
4. Molecular profile: KRAS G12C positive (now targetable), PD-L1 45% (favorable for immunotherapy)
5. Performance status: ECOG 1 - suitable for aggressive multimodal therapy
6. Pulmonary function: Adequate for either definitive chemoRT or surgical approach

Treatment considerations:
- Stage IIIA with N2 disease: Per NCCN guidelines, concurrent chemoradiation followed by durvalumab consolidation is standard of care
- PACIFIC trial established durvalumab benefit in unresectable Stage III NSCLC
- PD-L1 TPS 45% supports immunotherapy benefit
- KRAS G12C mutation provides potential salvage option with sotorasib/adagrasib
- Surgical approach: Could consider if downstaging achieved, but N2 disease traditionally managed non-operatively

Risk assessment: Patient has adequate cardiopulmonary reserve. Main concerns are cisplatin nephrotoxicity (monitor with diabetes) and radiation pneumonitis (given underlying COPD).`,
      recommendation: `Recommended Treatment Plan:

Primary recommendation: Definitive concurrent chemoradiation followed by durvalumab consolidation.

Regimen details:
1. Chemoradiation: Cisplatin/Etoposide with concurrent thoracic RT (60 Gy/30 fractions)
2. Consolidation: Durvalumab 10mg/kg every 2 weeks for 12 months post-chemoRT
3. Consider clinical trial enrollment for KRAS G12C targeted combinations if progression occurs

Monitoring: Regular imaging every 3 months, brain MRI every 6 months given adenocarcinoma histology.`
    }
  },
  {
    id: 'case-002',
    patientHistory: `Patient: 54-year-old premenopausal female

Chief Complaint: Self-detected left breast mass found 4 weeks ago during self-examination.

History of Present Illness: The patient noticed a firm, non-tender mass in the upper outer quadrant of her left breast approximately one month ago. She reports the mass has remained stable in size. No nipple discharge, skin changes, or breast pain noted. She denies any systemic symptoms such as weight loss, bone pain, or shortness of breath.

Past Medical History: No significant medical conditions. G2P2, first pregnancy at age 28. Breastfed both children for 12 months each. Regular mammographic screening since age 40, last mammogram 14 months ago was normal.

Family History: Mother diagnosed with breast cancer at age 67 (ER-positive, treated with surgery and tamoxifen). No other family history of breast, ovarian, pancreatic, or prostate cancer. Patient has not undergone genetic testing.

Diagnostic Workup:
- Diagnostic mammogram: 2.8 cm irregular mass with spiculated margins at 10 o'clock position, 6 cm from nipple. BIRADS 5
- Breast ultrasound: 2.7 x 2.3 x 2.1 cm hypoechoic mass with angular margins, associated with two suspicious axillary lymph nodes (largest 1.8 cm)
- Core needle biopsy of breast mass: Invasive ductal carcinoma, Grade 2, ER 95%, PR 80%, HER2 3+ by IHC (confirmed by FISH amplification ratio 4.2)
- Axillary lymph node FNA: Positive for metastatic carcinoma
- CT chest/abdomen/pelvis: No evidence of distant metastatic disease
- Bone scan: No skeletal metastases

Staging: Clinical Stage IIB (T2N1M0)

The patient is highly anxious about her diagnosis and wishes to understand all available treatment options including breast conservation versus mastectomy.`,
    groundTruth: `Recommend neoadjuvant TCHP (docetaxel, carboplatin, trastuzumab, pertuzumab) for 6 cycles, followed by surgery and adjuvant therapy based on pathologic response. Genetic counseling for BRCA testing given family history, and fertility preservation discussion prior to chemotherapy.`,
    aiOutput: {
      reasoningTrace: `Case analysis:
1. Patient profile: 54-year-old premenopausal female with newly diagnosed breast cancer
2. Tumor characteristics: Invasive ductal carcinoma, Grade 2
3. Biomarkers: ER 95%, PR 80% (strongly hormone receptor positive), HER2 3+ amplified
4. Staging: T2N1M0 = Stage IIB (tumor 2.8 cm with positive axillary nodes)
5. No distant metastases on staging workup

Treatment planning rationale:
- HER2-positive disease: Neoadjuvant approach preferred to assess chemosensitivity and potentially enable breast conservation
- Standard regimen: TCHP (Docetaxel, Carboplatin, Trastuzumab, Pertuzumab) based on KRISTINE, TRAIN-2 trials
- Dual HER2 blockade with trastuzumab + pertuzumab improves pCR rates
- Surgical approach depends on response - BCS achievable if good downsizing
- Adjuvant planning: pCR guides decision between continued trastuzumab vs T-DM1 (KATHERINE trial)
- Endocrine therapy essential for ER-positive disease

Breast conservation candidacy: Currently borderline given tumor size relative to breast volume - neoadjuvant therapy may enable breast conservation.`,
      recommendation: `Recommended Treatment Plan:

1. Neoadjuvant therapy: TCHP x 6 cycles (Docetaxel, Carboplatin, Trastuzumab, Pertuzumab)
2. Surgery post-neoadjuvant: Breast-conserving surgery versus mastectomy based on response and patient preference. Axillary staging per clinical response.
3. Adjuvant HER2-directed therapy: Based on pathologic response - continue trastuzumab if pCR; switch to T-DM1 if residual disease
4. Radiation therapy: Per surgical approach
5. Endocrine therapy: Tamoxifen or ovarian suppression + AI for 5-10 years

Patient should be counseled regarding surgical options, fertility preservation, and reconstructive options if mastectomy chosen.`
    }
  },
  {
    id: 'case-003',
    patientHistory: `Patient: 68-year-old male

Chief Complaint: Abdominal pain and altered bowel habits for 3 months, with recent bright red blood per rectum.

History of Present Illness: The patient describes gradually worsening crampy left lower quadrant abdominal pain over the past three months. He has noticed increasingly narrow stools and alternating constipation and diarrhea. Three weeks ago, he began noticing bright red blood mixed with stool, occurring with most bowel movements. He reports decreased appetite and unintentional weight loss of 12 pounds over 2 months. He denies nausea, vomiting, or jaundice.

Past Medical History: Hyperlipidemia (on atorvastatin), Osteoarthritis. No prior colonoscopy.

Family History: Father died of "stomach cancer" at age 72. No known history of colorectal cancer or Lynch syndrome in the family.

Diagnostic Workup:
- Colonoscopy: Near-obstructing mass in the sigmoid colon at 25 cm from anal verge. Colonoscope unable to pass beyond mass. Biopsies obtained.
- Pathology: Moderately differentiated adenocarcinoma
- CEA: 48.2 ng/mL (elevated)
- CT chest/abdomen/pelvis: 5.5 cm sigmoid mass with pericolonic fat stranding, three enlarged pericolonic lymph nodes (largest 2.1 cm), and 4 hepatic lesions consistent with metastases (largest 3.2 cm in right lobe, segments 6 and 7; two lesions in left lobe, segments 2 and 3)
- Liver MRI: Confirms 4 metastatic lesions as described, no additional lesions identified
- Molecular testing (on biopsy): MSS (microsatellite stable), KRAS G12D mutation, BRAF wild-type, HER2 negative

Staging: Stage IVA (T3N1M1a - liver only metastases)

ECOG Performance Status: 1

The patient is otherwise healthy and motivated for aggressive treatment. He asks about the possibility of cure and what treatment options exist.`,
    groundTruth: `Recommend hepatobiliary surgery evaluation for potential curative resection of oligometastatic disease. If resectable, neoadjuvant FOLFOX for 4 cycles followed by staged or synchronous resection of primary and liver metastases, then adjuvant chemotherapy to complete 6 months total perioperative treatment.`,
    aiOutput: {
      reasoningTrace: `Case evaluation:
1. 68-year-old male with newly diagnosed metastatic colorectal cancer
2. Primary: Near-obstructing sigmoid adenocarcinoma
3. Metastases: 4 hepatic lesions (bilobar but limited number)
4. Molecular: KRAS G12D mutated (rules out anti-EGFR therapy), MSS (unlikely to respond to checkpoint inhibitors), BRAF wild-type (better prognosis than BRAF-mutant)
5. CEA markedly elevated at 48.2 - useful for monitoring response
6. Good performance status (ECOG 1)

Treatment strategy considerations:
- Oligometastatic liver disease in colorectal cancer can be treated with curative intent if all disease is resectable
- 4 lesions is within resectable range for experienced hepatobiliary surgeons
- Bilobar distribution may require staged hepatectomy or ablation combination
- Standard approach: Neoadjuvant chemotherapy → restaging → surgery
- KRAS mutant: Best chemotherapy backbone is FOLFOX or FOLFIRI
- Bevacizumab consideration in neoadjuvant setting - may impact surgical planning (need 6-week washout)

Primary tumor: Near-obstructing, but if patient tolerating oral intake, can proceed with neoadjuvant chemotherapy. May need colonic stent if deteriorates.`,
      recommendation: `Recommended Treatment Plan:

1. First-line chemotherapy: FOLFIRI + Cetuximab for 6 cycles
2. Restaging after 3-4 cycles with CT and CEA
3. If response achieved: Surgical evaluation for hepatic metastasectomy
4. Primary tumor: Address surgically - timing based on symptoms and response

This regimen will provide optimal tumor response while we assess for surgical candidacy.

Note: Genetic counseling recommended given family history.`
    }
  },
  {
    id: 'case-004',
    patientHistory: `Patient: 71-year-old male

Chief Complaint: Elevated PSA discovered on routine screening.

History of Present Illness: The patient had routine PSA testing during his annual physical examination. His PSA was found to be 8.4 ng/mL, up from 4.2 ng/mL one year ago and 3.1 ng/mL two years ago. He is completely asymptomatic - no urinary symptoms, bone pain, or constitutional symptoms. Digital rectal examination revealed a firm nodule in the right lobe of the prostate.

Past Medical History: Hypertension (controlled on amlodipine), BPH (on tamsulosin), Type 2 Diabetes (on metformin, HbA1c 6.8%).

Family History: Father had prostate cancer diagnosed at age 78, treated with radiation, died at 85 of unrelated causes. No family history of breast or ovarian cancer.

Diagnostic Workup:
- PSA: 8.4 ng/mL, PSA density 0.19
- Multiparametric MRI prostate: PI-RADS 5 lesion in the right peripheral zone, approximately 1.8 cm, with extracapsular extension suspected. No seminal vesicle invasion. One suspicious right obturator lymph node (1.2 cm).
- MRI/US fusion biopsy: 12-core systematic + 3 targeted cores to MRI lesion
  - Targeted cores: Gleason 4+4=8 (Grade Group 4) in 3/3 cores, 80% core involvement
  - Systematic cores: Gleason 4+3=7 (Grade Group 3) in 2/12 cores (right apex, right mid), Gleason 3+4=7 in 1/12 cores (right base)
  - Left side: All cores negative
- PSMA PET-CT: Intense uptake in right prostate lesion (SUVmax 18), suspicious right obturator lymph node (SUVmax 6.2), no distant metastases
- CT chest: No pulmonary metastases
- Bone scan: No skeletal metastases

Staging: Clinical Stage IIIC (T3aN1M0) - high-risk localized with suspected nodal involvement

ECOG Performance Status: 0

The patient is active, plays golf twice weekly, and is very concerned about maintaining quality of life including urinary continence and erectile function. He wants to understand all treatment options and their side effect profiles.`,
    groundTruth: `Recommend definitive radiation therapy with IMRT to prostate and pelvic nodes (78-80 Gy) combined with long-term ADT for 24-36 months, with consideration of abiraterone addition per STAMPEDE data for high-risk disease. This approach offers best balance of disease control and quality of life preservation.`,
    aiOutput: {
      reasoningTrace: `Case analysis:
1. 71-year-old male with high-risk prostate cancer
2. PSA kinetics concerning: Rising from 3.1 → 4.2 → 8.4 over 2 years
3. Gleason 4+4=8 (Grade Group 4) - high grade disease
4. MRI shows T3a disease (extracapsular extension suspected)
5. PSMA-PET shows node-positive disease (N1) - changes management significantly
6. M0 on imaging - no distant metastases
7. Excellent performance status, quality of life is priority

Risk stratification: This is very high-risk/unfavorable disease based on:
- Gleason Grade Group 4
- Clinical T3a
- PSA >8
- Node-positive on PSMA-PET

Treatment considerations:
- Node-positive disease: Local therapy alone insufficient - need systemic therapy
- Options for local therapy: Radiation vs. Surgery
- Given ECE and N1 disease, if surgery is performed, patient would very likely need adjuvant radiation anyway (multimodal therapy)
- Patient priorities: Continence and erectile function - favors radiation as primary approach

Evidence base:
- STAMPEDE: Adding abiraterone to ADT + RT improves survival in high-risk disease
- RTOG 9413: Whole pelvic radiation + neoadjuvant ADT superior for node-positive risk
- Long-term ADT (24-36 months) required for this risk category

Patient counseling: Must discuss that with node-positive disease, even with aggressive local therapy, there is significant risk of distant recurrence. Goal is long-term disease control.`,
      recommendation: `Recommended Treatment Plan:

1. Long-term ADT: LHRH agonist for 24-36 months, beginning 2 months before radiation
2. Consider abiraterone addition per STAMPEDE data
3. Definitive IMRT: 78-80 Gy to prostate + seminal vesicles, 45-50 Gy to pelvic nodes
4. Bone health management: DEXA scan, calcium/vitamin D supplementation

This radiation-based approach offers the best balance of disease control while respecting the patient's quality of life priorities regarding continence. Erectile function will be affected by ADT regardless of local treatment choice, but may recover partially after ADT completion.

Alternative: Radical prostatectomy with extended PLND is feasible but would likely require adjuvant radiation, resulting in combined treatment toxicities.`
    }
  },
  {
    id: 'case-005',
    patientHistory: `Patient: 58-year-old female

Chief Complaint: Progressive headaches and left-sided weakness for 3 weeks.

History of Present Illness: The patient describes gradually worsening headaches over the past three weeks, predominantly frontal in location, worse in the morning, and associated with nausea. One week ago, she noticed weakness in her left arm and leg, which has progressively worsened. Her family notes subtle personality changes - she has become more irritable and occasionally confused. She had one witnessed seizure two days ago, which prompted emergency evaluation.

Past Medical History: Hypothyroidism (on levothyroxine), Anxiety disorder (on sertraline). No history of cancer.

Family History: Non-contributory.

Diagnostic Workup:
- CT Head (emergency): 4.5 cm heterogeneous right frontal mass with surrounding vasogenic edema and 8mm midline shift
- MRI Brain with contrast: 4.5 x 4.2 x 3.8 cm ring-enhancing mass in the right frontal lobe with central necrosis, significant perilesional edema, involvement of the corpus callosum suggesting infiltrative nature
- MRI spine: No evidence of spinal metastases or drop metastases
- CT chest/abdomen/pelvis: No primary malignancy or metastatic disease identified
- Surgical resection performed: Gross total resection achieved
- Pathology: Glioblastoma, IDH-wildtype, MGMT promoter unmethylated, EGFR amplified, TERT promoter mutated

WHO Grade 4 Glioblastoma

Postoperative MRI (48 hours): Gross total resection confirmed with no residual enhancing tumor

Karnofsky Performance Status: 70 (post-operative, improving)

The patient's neurological deficits have improved significantly post-resection. She is now asking about prognosis and what treatments are available.`,
    groundTruth: `Recommend standard Stupp protocol with concurrent temozolomide and radiation (60 Gy in 30 fractions), followed by adjuvant temozolomide for 6-12 cycles. Tumor Treating Fields (Optune) should be offered based on EF-14 trial data. Clinical trial enrollment encouraged given MGMT unmethylated status.`,
    aiOutput: {
      reasoningTrace: `Case evaluation:
1. 58-year-old female with newly diagnosed glioblastoma
2. Favorable surgical outcome: Gross total resection achieved
3. Molecular features: IDH-wildtype (poor prognostic), MGMT unmethylated (poor response to temozolomide), EGFR amplified, TERT mutated
4. Current status: KPS 70, improving post-surgery
5. No evidence of multifocal or metastatic disease

Prognostic assessment:
- IDH-wildtype GBM: Worse prognosis than IDH-mutant
- MGMT unmethylated: Reduced benefit from temozolomide, median OS ~12-15 months
- Gross total resection: Favorable prognostic factor
- Age 58, good KPS: Favorable for tolerating aggressive therapy

Treatment planning:
- Stupp protocol remains standard of care even for MGMT unmethylated
- TTFields (Optune) adds survival benefit - should be offered
- Clinical trial consideration important, especially for MGMT unmethylated patients
- Given her relatively young age and good PS, she is a candidate for aggressive therapy

Supportive care needs:
- Steroid management
- Seizure prophylaxis
- VTE prophylaxis
- Rehabilitation services`,
      recommendation: `Recommended Treatment Plan:

Given the aggressive nature of her tumor and unfavorable MGMT status, I recommend an intensified approach:

1. High-dose radiation: 70 Gy in 35 fractions for improved local control
2. Temozolomide: Extended concurrent and adjuvant dosing
3. Add bevacizumab upfront: 10mg/kg every 2 weeks during radiation and continuing into maintenance phase for improved tumor control
4. Optune device: Initiate with first cycle of maintenance temozolomide
5. Continue current supportive medications

This intensified regimen will maximize tumor control given the unfavorable molecular profile. Bevacizumab will help control edema and may improve quality of life.

Prognosis: With aggressive treatment, we may be able to extend survival significantly beyond the typical median.`
    }
  },
  {
    id: 'case-006',
    patientHistory: `Patient: 45-year-old male

Chief Complaint: Pigmented lesion on upper back, noted to be changing by spouse.

History of Present Illness: The patient's wife noticed a dark mole on his upper back that has changed over the past 4-6 months. The lesion has become larger, darker, and has developed irregular borders. The patient was unaware of the changes as he cannot see his back easily. He denies any symptoms from the lesion - no itching, bleeding, or pain. He has no other concerning skin lesions and no systemic symptoms.

Past Medical History: No significant medical history. No prior skin cancers.

Social History: Works as a construction supervisor with significant outdoor sun exposure over 20+ years. History of multiple blistering sunburns in childhood and adolescence. No tanning bed use.

Family History: No family history of melanoma or other skin cancers.

Diagnostic Workup:
- Dermatology examination: 1.4 cm asymmetric, irregularly bordered, variegated brown-black macule with areas of regression on the upper back
- Wide local excision performed with 1 cm margins
- Pathology: Malignant melanoma, superficial spreading type
  - Breslow thickness: 1.8 mm
  - Ulceration: Absent
  - Mitotic rate: 2/mm²
  - Margins: Negative (closest margin 0.8 cm)
  - Microsatellites: Absent
  - Lymphovascular invasion: Absent
- Sentinel lymph node biopsy: 0/3 sentinel nodes positive for melanoma
- LDH: Normal
- CT chest/abdomen/pelvis: No evidence of metastatic disease
- Brain MRI: No intracranial metastases
- BRAF mutation testing: BRAF V600E mutation detected

Staging: Stage IIA (T2aN0M0)

ECOG Performance Status: 0

The patient is anxious about recurrence and wants to know what additional treatment, if any, is recommended.`,
    groundTruth: `For Stage IIA melanoma with negative sentinel nodes, observation with regular surveillance is the standard approach given favorable prognosis (5-year survival ~94%). Adjuvant pembrolizumab is an option per KEYNOTE-716 but offers modest absolute benefit versus toxicity risk; shared decision-making recommended.`,
    aiOutput: {
      reasoningTrace: `Case evaluation:
1. 45-year-old male with intermediate-thickness melanoma
2. Pathologic features: 1.8 mm, non-ulcerated, mitotic rate 2/mm², no LVI
3. Staging workup negative: SLN negative (0/3), imaging clear
4. Final stage: IIA (T2aN0M0)
5. Molecular: BRAF V600E mutated (relevant if metastatic)

Prognosis:
- Stage IIA has approximately 5-year melanoma-specific survival of 94%
- 10-year survival approximately 85-90%
- Main risks: Local/regional recurrence, new primary melanoma

Adjuvant therapy landscape:
- KEYNOTE-716: Pembrolizumab improved RFS in Stage IIB/IIC melanoma
- Stage IIA data: Less robust, modest absolute benefit
- Toxicity consideration: Immune-related AEs can be permanent (endocrine, etc.)
- Risk-benefit: For Stage IIA, absolute benefit is small; observation is very reasonable

Surveillance approach:
- Higher-risk intermediate melanoma benefits from regular follow-up
- Imaging surveillance: Variable practice; some advocate for it in intermediate-risk
- Self-examination education important

Patient factors:
- Good performance status, anxious about recurrence
- Sun damage phenotype - higher risk of additional primaries
- Needs comprehensive skin surveillance`,
      recommendation: `Recommended Treatment Plan:

Given this patient's anxiety about recurrence and the available evidence, I recommend:

1. Adjuvant immunotherapy: Pembrolizumab 200 mg IV every 3 weeks for 1 year
   - Based on KEYNOTE-716 showing improved recurrence-free survival
   - BRAF mutation detected but targeted therapy (dabrafenib/trametinib) is better reserved for metastatic setting
   - Starting immunotherapy proactively addresses patient's anxiety and maximizes his chance of cure

2. If immunotherapy is not tolerated or patient declines:
   - Structured surveillance program
   - Clinical exam every 3 months for 2 years
   - Surveillance imaging (PET-CT) every 6 months for 2 years

3. Dermatology follow-up every 6 months for full-body skin examination

4. Strict photoprotection counseling

I believe the proactive approach with adjuvant pembrolizumab is superior to observation for this motivated patient who wants to maximize his chances.`
    }
  },
  {
    id: 'case-007',
    patientHistory: `Patient: 69-year-old female

Chief Complaint: Abdominal pain, early satiety, and jaundice for 6 weeks.

History of Present Illness: The patient reports gradually worsening epigastric and right upper quadrant pain over the past 6 weeks. The pain is dull, constant, and radiates to her back. She has experienced significant early satiety, only able to eat small portions before feeling full. She noticed yellowing of her eyes and skin approximately 3 weeks ago, along with dark urine and pale stools. She has lost 18 pounds over the past 2 months without trying. She also reports new-onset diabetes diagnosed 4 months ago.

Past Medical History: Type 2 Diabetes (new onset, 4 months ago, now on insulin), Hypertension, Former smoker (20 pack-years, quit 10 years ago).

Family History: Brother died of pancreatic cancer at age 65. No other family history of GI malignancies.

Diagnostic Workup:
- Labs: Total bilirubin 8.4, Direct bilirubin 6.8, Alkaline phosphatase 412, AST 98, ALT 124, CA 19-9: 842 U/mL
- CT abdomen with contrast: 3.2 cm hypodense mass in the pancreatic head with pancreatic duct dilation (6 mm) and common bile duct dilation (12 mm). No definite vascular involvement. Several borderline enlarged peripancreatic lymph nodes. No liver metastases or peritoneal disease evident.
- MRI/MRCP: Confirms 3.2 cm mass in pancreatic head, double duct sign present. Possible abutment of SMV (<180 degrees), SMA appears clear.
- EUS with FNA: Pancreatic head mass biopsied. Pathology: Moderately differentiated adenocarcinoma.
- ERCP: Biliary stent placed for decompression, bilirubin trending down
- PET-CT: FDG-avid pancreatic head mass (SUVmax 6.8), no distant metastatic disease identified
- Genetic testing: BRCA1/2 negative, no pathogenic germline variants identified

Staging: Borderline resectable pancreatic adenocarcinoma (BRPC) based on SMV abutment

ECOG Performance Status: 1

The patient understands this is a serious diagnosis and wants to know her treatment options and chances for cure.`,
    groundTruth: `Recommend neoadjuvant FOLFIRINOX or gemcitabine/nab-paclitaxel for 4-6 cycles, followed by restaging and surgical exploration for pancreaticoduodenectomy if no progression. Total perioperative chemotherapy should equal approximately 6 months. Surgery offers the only chance for long-term survival.`,
    aiOutput: {
      reasoningTrace: `Case evaluation:
1. 69-year-old female with pancreatic head adenocarcinoma
2. Clinical presentation classic: painless jaundice (now with pain due to size), weight loss, new-onset diabetes
3. CA 19-9 elevated at 842 - useful for monitoring but not diagnostic
4. Imaging: 3.2 cm mass, borderline resectable due to SMV abutment (<180 degrees)
5. No distant metastases on PET-CT
6. BRCA negative - not eligible for PARP inhibitor maintenance

Resectability assessment:
- SMV abutment <180 degrees = borderline resectable
- SMA clear = favorable
- No celiac axis involvement mentioned = favorable
- No metastatic disease = surgical candidate

Treatment approach:
- Borderline resectable: Neoadjuvant therapy standard before surgery
- Goals of neoadjuvant: Improve R0 resection rate, treat micrometastatic disease, select patients whose biology allows surgery
- FOLFIRINOX vs. Gem/Nab-P: FOLFIRINOX more active but more toxic
- Age 69, ECOG 1, might tolerate FOLFIRINOX but need to assess carefully

Family history consideration:
- Brother with pancreatic cancer at 65
- Should have had genetic counseling (completed, BRCA negative)
- Still potentially familial clustering

Post-resection:
- Total perioperative chemo of 6 months
- High recurrence risk even with R0 resection`,
      recommendation: `Recommended Treatment Plan:

This is a complex case requiring nuanced decision-making. Given the borderline resectable status and the patient's questions about cure:

Option A - Aggressive curative-intent approach:
1. Neoadjuvant FOLFIRINOX x 4-6 cycles (if tolerated)
2. Restaging imaging and CA 19-9
3. Pancreaticoduodenectomy if no progression
4. Adjuvant chemotherapy to complete 6 months total

Option B - Modified approach (if concerns about FOLFIRINOX tolerance):
1. Gemcitabine + nab-paclitaxel neoadjuvant
2. Same surgical pathway

Both approaches are reasonable. I would defer to patient preference and detailed discussion of toxicity profiles. The prognosis is guarded - approximately 20-30% may achieve long-term survival with R0 resection and modern chemotherapy.

Given the family history, I recommend ongoing surveillance for her children even though germline testing was negative.`
    }
  },
  {
    id: 'case-008',
    patientHistory: `Patient: 61-year-old female

Chief Complaint: Abdominal bloating and early satiety for 2 months.

History of Present Illness: The patient describes progressive abdominal bloating and distension over the past 2 months. She reports feeling full after eating only small amounts and has noticed her clothes fitting tighter around the waist. She has also experienced intermittent lower abdominal discomfort and increased urinary frequency. She denies vaginal bleeding (postmenopausal for 10 years), weight loss, or changes in bowel habits. She has not had any nausea or vomiting.

Past Medical History: Hypertension (controlled on losartan), Hyperlipidemia, Osteoporosis. No prior surgeries. Last Pap smear 2 years ago was normal.

Gynecologic History: G3P3, menarche age 12, menopause age 51. No history of infertility or endometriosis. No hormone replacement therapy use.

Family History: Mother had breast cancer at age 70 (ER-positive). Maternal aunt had ovarian cancer at age 58. No known genetic testing in family.

Diagnostic Workup:
- Pelvic ultrasound: Large complex cystic and solid mass in the pelvis measuring 12 x 10 x 9 cm, likely originating from the right ovary. Moderate ascites present.
- CA-125: 584 U/mL (elevated)
- CT chest/abdomen/pelvis: Right adnexal mass as described, omental thickening concerning for omental caking, multiple peritoneal implants, moderate ascites. No liver parenchymal metastases. No thoracic disease.
- Paracentesis: Cytology positive for adenocarcinoma consistent with ovarian/tubal/peritoneal primary
- Genetic counseling and testing: BRCA2 pathogenic variant detected

Presumptive Staging: Stage IIIC high-grade serous ovarian carcinoma (based on imaging showing peritoneal spread)

ECOG Performance Status: 1

The patient is stunned by the diagnosis and the BRCA2 finding. She wants to understand the treatment approach and prognosis.`,
    groundTruth: `Recommend primary debulking surgery if optimal cytoreduction achievable, otherwise neoadjuvant carboplatin/paclitaxel followed by interval debulking. Olaparib maintenance for 2 years post-chemotherapy given BRCA2 mutation per SOLO1 trial. Cascade genetic testing for family members essential.`,
    aiOutput: {
      reasoningTrace: `Case analysis:
1. 61-year-old female with presumed Stage IIIC high-grade serous ovarian carcinoma
2. Clinical presentation: Typical for advanced ovarian cancer (bloating, early satiety, ascites)
3. CA-125 significantly elevated (584)
4. Imaging: Large adnexal mass + omental caking + peritoneal implants + ascites = Stage IIIC
5. Ascitic cytology confirms adenocarcinoma
6. BRCA2 mutation detected - important treatment implications

BRCA implications:
- Better platinum sensitivity
- Excellent PARP inhibitor response
- SOLO1 trial: Olaparib maintenance with dramatic PFS benefit in BRCA-mutated

Treatment approach considerations:
- Primary surgery vs. NACT: Depends on surgical assessment of resectability
- Need gynecologic oncology evaluation for surgical planning
- Extent of peritoneal disease will determine approach
- Complete gross resection is the goal regardless of timing

Chemotherapy:
- Carboplatin/Paclitaxel standard backbone
- Bevacizumab option for addition
- PARP inhibitor maintenance mandatory given BRCA2 status

Family implications:
- Children have 50% risk of inheriting BRCA2
- Need cascade testing discussion
- Patient also at elevated breast cancer risk`,
      recommendation: `Recommended Treatment Plan:

1. Gynecologic oncology consultation for surgical assessment
2. Treatment sequence:
   - If amenable to primary surgery: PDS → Adjuvant carboplatin/paclitaxel x 6 cycles
   - If bulky disease: NACT (carboplatin/paclitaxel x 3-4) → IDS → Complete chemotherapy

3. Maintenance therapy: Olaparib 300 mg BID for 2 years following chemotherapy completion and documented response
   - BRCA2 mutation makes her an excellent candidate for PARP inhibitor maintenance

4. Genetic counseling for family: Cascade testing for first-degree relatives

5. Address breast cancer risk: Annual breast MRI, discussion of risk-reducing options

This patient has a somewhat favorable prognosis among Stage IIIC cases given BRCA2 status and expected platinum/PARP inhibitor sensitivity.`
    }
  },
  {
    id: 'case-009',
    patientHistory: `Patient: 72-year-old male

Chief Complaint: Back pain and fatigue for 3 months, found to have anemia on routine labs.

History of Present Illness: The patient has experienced progressive mid-back and lower back pain over the past 3 months. The pain is constant, worse at night, and does not improve with rest or positional changes. He has also noticed increasing fatigue and generalized weakness. He has lost approximately 10 pounds unintentionally. He denies fever, night sweats, numbness/tingling in extremities, or bowel/bladder dysfunction.

Past Medical History: Hypertension, BPH (on tamsulosin), Chronic kidney disease stage 3a (baseline creatinine 1.4).

Social History: Retired accountant. Never smoker. Occasional alcohol use.

Diagnostic Workup:
- CBC: Hemoglobin 9.2 g/dL (normocytic), WBC 5.4, Platelets 168
- Comprehensive metabolic panel: Creatinine 1.8 (elevated from baseline), Calcium 11.2 (elevated), Total protein 9.8 (elevated), Albumin 3.2
- Serum protein electrophoresis (SPEP): Monoclonal spike (M-spike) 3.8 g/dL in gamma region
- Serum free light chains: Kappa 8.4 mg/L, Lambda 386 mg/L, ratio 0.02 (abnormal, lambda predominant)
- 24-hour urine protein electrophoresis: 1.2 g/24h Bence Jones proteinuria (lambda)
- Bone marrow biopsy: 45% plasma cells with lambda light chain restriction, cytogenetics show del(17p) in 18% of cells, t(4;14) negative, no 1q gain
- Skeletal survey: Multiple lytic lesions in spine (T7, T10, L2, L4), bilateral ribs, and right proximal femur
- MRI spine: Confirms multiple vertebral lesions with T10 compression fracture without cord compression
- Beta-2 microglobulin: 5.8 mg/L
- LDH: 242 (upper normal)

Diagnosis: Multiple Myeloma, IgG Lambda
ISS Stage: III (beta-2 microglobulin >5.5)
R-ISS Stage: III (due to del(17p))

ECOG Performance Status: 2

The patient is accompanied by his adult children who want to understand treatment options and prognosis.`,
    groundTruth: `Recommend quadruplet induction with daratumumab-VRd (Dara-bortezomib-lenalidomide-dexamethasone) given high-risk del(17p). Assess transplant eligibility after initial response. Bone-targeted therapy with denosumab and vertebroplasty evaluation for T10 compression fracture. Maintenance should include bortezomib given high-risk cytogenetics.`,
    aiOutput: {
      reasoningTrace: `Case analysis:
1. 72-year-old male with newly diagnosed multiple myeloma
2. CRAB criteria present: Calcium elevated, Renal insufficiency (worsening), Anemia, Bone lesions
3. High tumor burden: M-spike 3.8, 45% plasma cells in marrow
4. HIGH-RISK CYTOGENETICS: del(17p) - this is critical for treatment planning
5. ISS Stage III (beta-2 microglobulin >5.5) → R-ISS Stage III due to del(17p)
6. Lambda light chain disease with Bence Jones proteinuria (contributing to renal impairment)

Risk stratification:
- del(17p) is the highest-risk genetic abnormality
- Associated with shorter remissions and inferior survival
- Requires aggressive treatment approach

Transplant eligibility:
- Age 72: On the border - many centers will transplant fit patients up to 75
- ECOG 2: Moderate impairment, needs improvement
- CKD and compression fracture complicate picture
- Should be evaluated but may ultimately be transplant-ineligible

Treatment approach for high-risk:
- Quadruplet induction now standard for high-risk
- Dara-VRd showing best outcomes in trials
- Bortezomib particularly important for del(17p) (overcomes some of the risk)
- Must include maintenance with more than just lenalidomide

Supportive care needs:
- Bone stabilization urgent
- Hypercalcemia treatment
- Renal protection (avoid nephrotoxins)`,
      recommendation: `Recommended Treatment Plan:

1. Immediate supportive care:
   - IV hydration for hypercalcemia and renal protection
   - Start bone-targeting agent: Denosumab 120 mg monthly (preferred over bisphosphonate given CKD)
   - Vertebroplasty evaluation for T10 compression fracture
   - Pain management

2. Induction therapy: VRd (Bortezomib 1.3 mg/m² SC weekly + Lenalidomide 25 mg days 1-14 + Dexamethasone 40 mg weekly) in 21-day cycles
   - Plan for 4-6 cycles initially
   - Lenalidomide dose reduction may be needed given CKD

3. Transplant evaluation: Formal assessment after 2-3 cycles if responding and PS improving

4. Maintenance: Lenalidomide-based maintenance following transplant or after extended induction

5. VTE prophylaxis: Low-dose aspirin
6. Infection prophylaxis: Acyclovir, consider PCP prophylaxis

Prognosis: With modern therapy, median survival even for high-risk disease is improving. Open, ongoing discussion with patient and family is important.`
    }
  },
  {
    id: 'case-010',
    patientHistory: `Patient: 56-year-old male

Chief Complaint: Enlarging neck mass and progressive hoarseness for 4 months.

History of Present Illness: The patient noticed a lump on the right side of his neck approximately 4 months ago that has progressively enlarged. Over the past 2 months, he has developed progressive hoarseness and now has a "breathy" voice quality. He also reports mild difficulty swallowing solids and occasional right ear pain. He has a 30 pack-year smoking history (still smoking) and drinks 3-4 beers daily. He has lost 15 pounds over 3 months without trying. He denies shortness of breath, hemoptysis, or skin lesions.

Past Medical History: COPD, Alcohol use disorder, No prior malignancies.

Social History: 30 pack-year smoking history (1.5 packs/day for 20 years), current smoker. Alcohol: 3-4 beers daily for many years.

Diagnostic Workup:
- Flexible laryngoscopy: Large exophytic mass involving the right true vocal cord with extension to the right false cord and aryepiglottic fold. Right vocal cord immobile (fixed). Left cord mobile with compensatory movement.
- CT neck with contrast: 4.2 cm mass centered in the right larynx with cartilage invasion (thyroid cartilage). Right level II/III lymph node conglomerate measuring 3.5 cm. No contralateral lymphadenopathy.
- PET-CT: FDG-avid primary (SUVmax 14.2), FDG-avid right neck nodes (SUVmax 9.8). No distant metastases.
- Direct laryngoscopy with biopsy: Moderately differentiated squamous cell carcinoma, p16 negative
- MRI neck: Confirms right vocal cord fixation due to tumor invasion of thyroarytenoid muscle, no skull base involvement
- Pulmonary function tests: FEV1 58% predicted, DLCO 52% predicted (moderate COPD)
- HPV testing: p16 negative, HPV DNA negative (not HPV-related)

Staging: Stage IVA (T4aN2bM0) Laryngeal Squamous Cell Carcinoma

ECOG Performance Status: 1

The patient is devastated by the diagnosis and is particularly concerned about losing his voice. He asks whether his voice can be preserved and what his treatment options are.`,
    groundTruth: `For T4a laryngeal SCC with cartilage invasion, total laryngectomy with bilateral neck dissection followed by adjuvant radiation offers best local control. Organ preservation with chemoradiation is an alternative but has lower success rates for T4a disease (~50%); requires clear counseling that salvage laryngectomy may be needed.`,
    aiOutput: {
      reasoningTrace: `Case evaluation:
1. 56-year-old male with advanced laryngeal squamous cell carcinoma
2. Risk factors: Heavy smoking and alcohol - classic for laryngeal SCC
3. Staging: T4a (cartilage invasion) N2b (single ipsilateral node >3cm) M0 = Stage IVA
4. HPV/p16 negative - not related to HPV, expected for laryngeal primary
5. Vocal cord fixed - indicates muscle invasion or recurrent laryngeal nerve involvement
6. Voice already significantly impaired
7. Moderate COPD - needs consideration for treatment planning

Treatment considerations:
- T4a laryngeal cancer: Traditionally considered for primary surgery
- Organ preservation protocols (RTOG 91-11) showed benefit for larynx preservation but:
  - Original study included T4 but these had lower preservation rates
  - Cartilage invasion (T4a) is a negative predictor for organ preservation success
- Patient concerned about voice - but his voice is already very impaired
- HPV-negative status: Worse prognosis than HPV-positive H&N cancers

Surgical approach:
- Total laryngectomy required given extent
- Cannot do partial laryngectomy with fixed cord and T4a disease
- Neck dissection bilateral vs. ipsilateral only (contralateral appears clear)
- Adjuvant treatment needed given stage

Chemoradiation approach:
- Cisplatin-based concurrent with 70 Gy
- May preserve laryngeal structure but function already compromised
- Higher locoregional failure risk with T4a
- Salvage surgery more morbid after radiation

COPD consideration:
- FEV1 58% - can tolerate laryngectomy
- Would affect radiation tolerability (esophagitis, etc.)`,
      recommendation: `Recommended Treatment Plan:

Given the patient's strong desire for voice preservation, I recommend a trial of definitive chemoradiation as an organ preservation approach:

1. Smoking cessation: Mandatory - refer to cessation program immediately
2. Dental evaluation: Pre-radiation dental clearance
3. PEG tube placement: Prophylactic given expected dysphagia
4. Chemoradiation:
   - Cisplatin 40 mg/m² weekly x 7 with concurrent IMRT
   - 70 Gy to primary + involved nodes
   - 54 Gy to elective nodal regions
5. Mid-treatment assessment at 4-5 weeks
6. Post-treatment PET-CT at 12 weeks
7. Salvage laryngectomy for residual/recurrent disease

I believe this approach respects the patient's voice preservation wishes while providing aggressive treatment. The approximately 50% chance of successful organ preservation is worth attempting given how important voice is to this patient's quality of life.

Alternative: If patient reconsiders, total laryngectomy with adjuvant radiation provides highest local control.`
    }
  }
]
