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
      modelName: 'Model A',
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
- KRAS G12C mutation provides potential salvage option with sotorasib/adagrasib`,
      recommendation: `Recommended Treatment Plan:

Primary recommendation: Definitive concurrent chemoradiation followed by durvalumab consolidation.

Regimen details:
1. Chemoradiation: Cisplatin/Etoposide with concurrent thoracic RT (60 Gy/30 fractions)
2. Consolidation: Durvalumab 10mg/kg every 2 weeks for 12 months post-chemoRT
3. Consider clinical trial enrollment for KRAS G12C targeted combinations if progression occurs

Monitoring: Regular imaging every 3 months, brain MRI every 6 months given adenocarcinoma histology.`
    },
    aiOutputB: {
      modelName: 'Model B',
      reasoningTrace: `Case review for Stage IIIA NSCLC:

This 62-year-old presents with potentially resectable Stage IIIA disease. Key considerations:
- N2 disease confirmed on PET but limited to stations 4R and 7
- Good pulmonary reserve (FEV1 72%)
- ECOG 1 performance status
- KRAS G12C mutation - relevant for systemic therapy

Given the emergence of neoadjuvant immunotherapy data (CheckMate-816), there is growing evidence for surgical approaches in selected Stage III patients.`,
      recommendation: `Recommended Treatment Plan:

Given potentially resectable N2 disease and good functional status, recommend neoadjuvant chemoimmunotherapy followed by surgical resection:

1. Neoadjuvant: Nivolumab + platinum-doublet chemotherapy x 3 cycles
2. Restaging PET-CT after neoadjuvant therapy
3. If no progression: Right upper lobectomy with mediastinal lymph node dissection
4. Adjuvant therapy based on pathologic response

This approach offers potential for pathologic complete response and long-term disease control. If surgery not feasible after neoadjuvant, can proceed with definitive chemoradiation.

Alternative: Standard concurrent chemoRT + durvalumab if patient prefers non-surgical approach.`
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
      modelName: 'Model A',
      reasoningTrace: `Case analysis:
1. Patient profile: 54-year-old premenopausal female with newly diagnosed breast cancer
2. Tumor characteristics: Invasive ductal carcinoma, Grade 2
3. Biomarkers: ER 95%, PR 80% (strongly hormone receptor positive), HER2 3+ amplified
4. Staging: T2N1M0 = Stage IIB (tumor 2.8 cm with positive axillary nodes)
5. No distant metastases on staging workup

Treatment planning rationale:
- HER2-positive disease: Neoadjuvant approach preferred to assess chemosensitivity
- Standard regimen: TCHP (Docetaxel, Carboplatin, Trastuzumab, Pertuzumab)
- Dual HER2 blockade improves pCR rates
- Adjuvant planning: pCR guides decision between continued trastuzumab vs T-DM1`,
      recommendation: `Recommended Treatment Plan:

1. Neoadjuvant therapy: TCHP x 6 cycles (Docetaxel, Carboplatin, Trastuzumab, Pertuzumab)
2. Surgery post-neoadjuvant: Breast-conserving surgery versus mastectomy based on response and patient preference
3. Adjuvant HER2-directed therapy: Based on pathologic response - continue trastuzumab if pCR; switch to T-DM1 if residual disease
4. Radiation therapy: Per surgical approach
5. Endocrine therapy: Tamoxifen or ovarian suppression + AI for 5-10 years

Patient should be counseled regarding surgical options, fertility preservation, and reconstructive options if mastectomy chosen.`
    },
    aiOutputB: {
      modelName: 'Model B',
      reasoningTrace: `Evaluating this HER2-positive breast cancer case:

Key features:
- Triple positive (ER+, PR+, HER2+)
- Clinical T2N1 disease
- Premenopausal patient with family history
- No genetic testing performed yet

Important considerations:
- Family history warrants BRCA testing BEFORE treatment decisions
- If BRCA positive, may influence surgical choice (bilateral mastectomy consideration)
- Fertility preservation should be addressed urgently given age and premenopausal status`,
      recommendation: `Recommended Treatment Plan:

URGENT: Before initiating any treatment:
1. Expedited genetic counseling and BRCA1/2 testing (results in 2 weeks)
2. Fertility preservation consultation - consider oocyte cryopreservation

Treatment approach (pending genetic results):
1. Neoadjuvant TCHP x 6 cycles
2. Surgery decision informed by:
   - BRCA status (if positive, consider bilateral mastectomy)
   - Response to neoadjuvant therapy
   - Patient preference
3. Adjuvant therapy per KATHERINE trial (T-DM1 if residual disease)
4. Endocrine therapy with ovarian function suppression + AI (preferred over tamoxifen in high-risk premenopausal)

Do NOT start chemotherapy until fertility preservation completed if patient desires future fertility.`
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
      modelName: 'Model A',
      reasoningTrace: `Case evaluation:
1. 68-year-old male with newly diagnosed metastatic colorectal cancer
2. Primary: Near-obstructing sigmoid adenocarcinoma
3. Metastases: 4 hepatic lesions (bilobar but limited number)
4. Molecular: KRAS G12D mutated (rules out anti-EGFR therapy), MSS, BRAF wild-type
5. CEA markedly elevated at 48.2
6. Good performance status (ECOG 1)

Treatment considerations:
- Oligometastatic liver disease can be treated with curative intent if resectable
- KRAS mutant: Best chemotherapy backbone is FOLFOX or FOLFIRI
- Near-obstructing primary may need urgent attention`,
      recommendation: `Recommended Treatment Plan:

1. First-line chemotherapy: FOLFIRI + Cetuximab for 6 cycles
2. Restaging after 3-4 cycles with CT and CEA
3. If response achieved: Surgical evaluation for hepatic metastasectomy
4. Primary tumor: Address surgically - timing based on symptoms and response

This regimen will provide optimal tumor response while we assess for surgical candidacy.

Note: Genetic counseling recommended given family history.`
    },
    aiOutputB: {
      modelName: 'Model B',
      reasoningTrace: `Stage IVA CRC with oligometastatic liver disease - potentially curable scenario.

Critical analysis:
- 4 liver metastases, bilobar distribution but limited in number
- Near-obstructing primary - may need urgent intervention
- KRAS G12D mutation - EGFR inhibitors contraindicated
- MSS - checkpoint inhibitors not indicated
- Good PS and motivated patient

This is a surgical candidate for curative-intent treatment. Key is multidisciplinary planning with hepatobiliary surgery upfront.`,
      recommendation: `Recommended Treatment Plan:

IMMEDIATE: Multidisciplinary tumor board with hepatobiliary surgery

Curative-intent approach:
1. Hepatobiliary surgery consultation for resectability assessment
2. If deemed resectable/potentially resectable:
   - Neoadjuvant FOLFOX x 4 cycles (avoid bevacizumab if surgery planned within 6 weeks)
   - Restaging CT and CEA
   - Staged surgical approach: Primary resection first, then hepatectomy after recovery
   OR synchronous resection if feasible
3. Perioperative chemotherapy: Total 6 months FOLFOX

Primary tumor management:
- If near-obstruction worsens: Colonic stent as bridge to surgery
- Monitor closely during neoadjuvant chemotherapy

Goal: R0 resection of all disease. 5-year survival 30-50% achievable with complete resection.

Note: FOLFIRI + Cetuximab is INCORRECT - KRAS mutant tumors do not respond to EGFR inhibitors.`
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
      modelName: 'Model A',
      reasoningTrace: `Case analysis:
1. 71-year-old male with high-risk prostate cancer
2. PSA kinetics concerning: Rising from 3.1 → 4.2 → 8.4 over 2 years
3. Gleason 4+4=8 (Grade Group 4) - high grade disease
4. MRI shows T3a disease (extracapsular extension suspected)
5. PSMA-PET shows node-positive disease (N1)
6. M0 on imaging - no distant metastases
7. Excellent performance status, quality of life is priority

Treatment considerations:
- Node-positive disease requires systemic therapy
- Patient priorities: Continence and erectile function - favors radiation`,
      recommendation: `Recommended Treatment Plan:

1. Long-term ADT: LHRH agonist for 24-36 months, beginning 2 months before radiation
2. Consider abiraterone addition per STAMPEDE data
3. Definitive IMRT: 78-80 Gy to prostate + seminal vesicles, 45-50 Gy to pelvic nodes
4. Bone health management: DEXA scan, calcium/vitamin D supplementation

This radiation-based approach offers the best balance of disease control while respecting the patient's quality of life priorities regarding continence.

Alternative: Radical prostatectomy with extended PLND is feasible but would likely require adjuvant radiation.`
    },
    aiOutputB: {
      modelName: 'Model B',
      reasoningTrace: `High-risk node-positive prostate cancer requiring multimodal therapy.

Analysis:
- cT3aN1M0 - locally advanced with nodal involvement
- Gleason 8 (Grade Group 4)
- PSMA PET positive node - high confidence for metastatic LN
- Patient concerned about QoL - important for treatment selection

Both surgery and radiation are options, but given N1 disease, radiation with ADT intensification is preferred. The STAMPEDE trial showed benefit of adding abiraterone.`,
      recommendation: `Recommended Treatment Plan:

Definitive radiation with intensified systemic therapy:

1. ADT: Degarelix (LHRH antagonist) - faster testosterone suppression, no flare
   Duration: 24-36 months total
2. Abiraterone 1000mg daily + prednisone 5mg daily for 2 years (STAMPEDE regimen)
3. IMRT to prostate (78 Gy) + pelvic lymph nodes (50 Gy)
4. Consider hypofractionation: 60 Gy in 20 fractions to reduce treatment time

QoL considerations:
- Erectile function: Will be significantly impaired by ADT regardless of local therapy; may recover 6-12 months after ADT completion
- Continence: Radiation has lower incontinence risk than surgery (~5% vs 15-20%)
- Bowel function: Small risk of radiation proctitis

Supportive care:
- DEXA scan at baseline
- Calcium 1200mg + Vitamin D 1000IU daily
- Exercise program to mitigate ADT side effects
- Consider referral to sexual health specialist`
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
      modelName: 'Model A',
      reasoningTrace: `Case evaluation:
1. 58-year-old female with newly diagnosed glioblastoma
2. Favorable surgical outcome: Gross total resection achieved
3. Molecular features: IDH-wildtype (poor prognostic), MGMT unmethylated (poor response to temozolomide), EGFR amplified
4. Current status: KPS 70, improving post-surgery

Treatment planning:
- Stupp protocol remains standard of care even for MGMT unmethylated
- TTFields adds survival benefit
- Clinical trial consideration important`,
      recommendation: `Recommended Treatment Plan:

Given the aggressive nature of her tumor and unfavorable MGMT status, I recommend an intensified approach:

1. High-dose radiation: 70 Gy in 35 fractions for improved local control
2. Temozolomide: Extended concurrent and adjuvant dosing
3. Add bevacizumab upfront: 10mg/kg every 2 weeks during radiation and continuing into maintenance
4. Optune device: Initiate with first cycle of maintenance temozolomide

This intensified regimen will maximize tumor control given the unfavorable molecular profile.`
    },
    aiOutputB: {
      modelName: 'Model B',
      reasoningTrace: `Newly diagnosed GBM, IDH-wildtype, MGMT unmethylated.

Key points:
- GTR achieved - favorable prognostic factor
- MGMT unmethylated - limited benefit from temozolomide but still standard of care
- Age 58, KPS 70 - candidate for full standard therapy
- EGFR amplified - potential trial eligibility

Should follow evidence-based Stupp protocol. Avoid non-standard intensification that lacks evidence and increases toxicity.`,
      recommendation: `Recommended Treatment Plan:

Standard Stupp Protocol (evidence-based):
1. Concurrent chemoradiation:
   - Radiation: 60 Gy in 30 fractions (standard dose - 70 Gy NOT supported by evidence)
   - Temozolomide: 75 mg/m² daily during radiation
2. Adjuvant temozolomide: 150-200 mg/m² days 1-5 every 28 days, 6-12 cycles
3. Tumor Treating Fields (Optune): Offer based on EF-14 trial - improves OS

Important notes:
- Bevacizumab does NOT improve overall survival in newly diagnosed GBM (RTOG 0825, AVAglio trials) - should NOT be added upfront
- High-dose radiation (>60 Gy) increases toxicity without survival benefit
- Consider clinical trial enrollment given MGMT unmethylated status and EGFR amplification

Supportive care:
- Dexamethasone taper post-surgery
- Levetiracetam for seizure prophylaxis
- PCP prophylaxis during chemoRT
- VTE prophylaxis

Prognosis discussion: Median survival ~12-15 months with MGMT unmethylated GBM. Goals of care conversation recommended.`
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
      modelName: 'Model A',
      reasoningTrace: `Case evaluation:
1. 45-year-old male with intermediate-thickness melanoma
2. Pathologic features: 1.8 mm, non-ulcerated, mitotic rate 2/mm², no LVI
3. Staging workup negative: SLN negative (0/3), imaging clear
4. Final stage: IIA (T2aN0M0)
5. Molecular: BRAF V600E mutated

Prognosis:
- Stage IIA has approximately 5-year melanoma-specific survival of 94%

Adjuvant therapy consideration:
- KEYNOTE-716: Pembrolizumab showed RFS benefit in Stage II melanoma`,
      recommendation: `Recommended Treatment Plan:

Given this patient's anxiety about recurrence and the available evidence, I recommend:

1. Adjuvant immunotherapy: Pembrolizumab 200 mg IV every 3 weeks for 1 year
   - Based on KEYNOTE-716 showing improved recurrence-free survival
   - Starting immunotherapy proactively addresses patient's anxiety

2. If immunotherapy is not tolerated or patient declines:
   - Structured surveillance program
   - Clinical exam every 3 months for 2 years
   - Surveillance imaging (PET-CT) every 6 months

3. Dermatology follow-up every 6 months
4. Strict photoprotection counseling`
    },
    aiOutputB: {
      modelName: 'Model B',
      reasoningTrace: `Stage IIA melanoma - favorable prognosis scenario.

Key data:
- 1.8 mm Breslow thickness, non-ulcerated = T2a
- Negative SLN (0/3) = N0
- No distant metastases = M0
- 5-year survival ~94%

KEYNOTE-716 considerations:
- Showed RFS improvement in Stage IIB/IIC (higher risk)
- Stage IIA benefit is modest in absolute terms
- Immune-related adverse events can be permanent (thyroiditis, colitis, pneumonitis)
- Treatment is 1 year of IV infusions every 3 weeks

Risk-benefit must be carefully weighed against excellent prognosis.`,
      recommendation: `Recommended Treatment Plan:

For Stage IIA melanoma with 94% 5-year survival, observation is the evidence-based standard:

1. PRIMARY RECOMMENDATION: Surveillance without adjuvant therapy
   - Excellent prognosis with surgery alone
   - Avoid unnecessary toxicity

2. Surveillance schedule:
   - Clinical exam + full skin exam every 3-6 months for 2 years, then every 6-12 months
   - No routine imaging recommended for Stage IIA (low yield, false positive risk)
   - Patient self-skin examination monthly

3. If patient strongly desires adjuvant therapy after shared decision-making:
   - Pembrolizumab is FDA-approved option
   - Must counsel on immune-related AEs: 15-20% Grade 3+ toxicity
   - Some AEs are permanent (hypothyroidism, diabetes, etc.)

4. Sun protection and skin cancer prevention counseling

Note: Patient anxiety alone should not drive treatment decisions. Education about excellent prognosis is therapeutic.`
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
      modelName: 'Model A',
      reasoningTrace: `Case evaluation:
1. 69-year-old female with pancreatic head adenocarcinoma
2. Borderline resectable due to SMV abutment
3. No distant metastases
4. BRCA negative

Treatment approach:
- Neoadjuvant therapy standard before surgery
- FOLFIRINOX vs. Gem/Nab-P options`,
      recommendation: `Recommended Treatment Plan:

This is a complex case. Given the borderline resectable status:

Option A - Aggressive curative-intent approach:
1. Neoadjuvant FOLFIRINOX x 4-6 cycles (if tolerated)
2. Restaging imaging and CA 19-9
3. Pancreaticoduodenectomy if no progression
4. Adjuvant chemotherapy to complete 6 months total

Option B - Modified approach (if concerns about FOLFIRINOX tolerance):
1. Gemcitabine + nab-paclitaxel neoadjuvant
2. Same surgical pathway

Both approaches are reasonable. I would defer to patient preference.`
    },
    aiOutputB: {
      modelName: 'Model B',
      reasoningTrace: `Borderline resectable pancreatic cancer - requires aggressive multimodal approach.

Key factors:
- 69 years old, ECOG 1 - can likely tolerate FOLFIRINOX
- SMV abutment <180° - borderline resectable, not unresectable
- No distant metastases - surgical candidate
- Family history (brother with pancreatic CA) - germline testing done, negative
- CA 19-9 842 - useful for monitoring

FOLFIRINOX is preferred over Gem/Nab-P for borderline resectable disease based on better response rates. Age 69 with good PS can tolerate modified FOLFIRINOX.`,
      recommendation: `Recommended Treatment Plan:

Curative-intent multimodal therapy:

1. Neoadjuvant chemotherapy: Modified FOLFIRINOX x 8 cycles (4 months)
   - 5-FU 2400 mg/m² over 46h (no bolus), Oxaliplatin 85 mg/m², Irinotecan 150 mg/m², Leucovorin 400 mg/m²
   - Every 2 weeks
   - G-CSF support as needed

2. Restaging after 4 cycles and at completion:
   - CT pancreas protocol
   - CA 19-9
   - If stable/responding, continue to 8 cycles

3. Surgical exploration:
   - Pancreaticoduodenectomy with SMV resection/reconstruction if needed
   - Goal: R0 resection

4. Adjuvant therapy:
   - If R0: Adjuvant gemcitabine/capecitabine x 6 months (ESPAC-4)
   - If R1: Consider additional chemoRT

Prognosis: With R0 resection, median survival 24-30 months. 5-year survival 15-20%. Without surgery, median survival ~12 months.

Supportive care: Nutritional support, pancreatic enzyme replacement, diabetes management.`
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
      modelName: 'Model A',
      reasoningTrace: `Case analysis:
1. 61-year-old female with presumed Stage IIIC ovarian carcinoma
2. CA-125 elevated (584)
3. Imaging shows peritoneal disease
4. BRCA2 mutation detected

Treatment considerations:
- Primary surgery vs. neoadjuvant depends on resectability
- PARP inhibitor maintenance mandatory given BRCA2`,
      recommendation: `Recommended Treatment Plan:

1. Gynecologic oncology consultation for surgical assessment
2. Treatment sequence:
   - If amenable to primary surgery: PDS → Adjuvant carboplatin/paclitaxel x 6 cycles
   - If bulky disease: NACT → IDS → Complete chemotherapy

3. Maintenance therapy: Olaparib 300 mg BID for 2 years
4. Genetic counseling for family
5. Address breast cancer risk: Annual breast MRI`
    },
    aiOutputB: {
      modelName: 'Model B',
      reasoningTrace: `Stage IIIC ovarian cancer with BRCA2 mutation - important therapeutic implications.

Analysis:
- Extensive disease: omental caking, peritoneal implants, ascites
- Need surgical assessment for primary vs. neoadjuvant approach
- BRCA2 positive: Excellent candidate for PARP inhibitor maintenance
- Family implications: Cascade testing needed

The decision between primary debulking (PDS) and neoadjuvant chemotherapy (NACT) depends on likelihood of optimal cytoreduction. Studies show equivalent survival if optimal debulking achieved either way.`,
      recommendation: `Recommended Treatment Plan:

1. IMMEDIATE: Gynecologic oncology surgical evaluation
   - Diagnostic laparoscopy to assess resectability if unclear from imaging
   - Fagotti score to guide PDS vs NACT decision

2. If primary debulking feasible (goal: no residual disease):
   - TAH/BSO, omentectomy, tumor debulking, lymph node assessment
   - Adjuvant carboplatin AUC 5-6 + paclitaxel 175 mg/m² q3 weeks x 6 cycles

3. If optimal debulking unlikely:
   - NACT: Carboplatin/paclitaxel x 3-4 cycles
   - Interval debulking surgery
   - Complete 6 total cycles of chemotherapy

4. Maintenance therapy (critical):
   - Olaparib 300 mg BID for 2 years (SOLO1 trial: 70% reduction in progression)
   - Start after completion of chemotherapy with documented response

5. Family counseling:
   - Children have 50% risk of BRCA2 mutation
   - Recommend cascade testing for all first-degree relatives
   - Discuss breast cancer risk (lifetime risk ~70%)
   - Consider risk-reducing mastectomy discussion after cancer treatment

Prognosis: BRCA-mutated ovarian cancers have better platinum sensitivity and PARP inhibitor response. 5-year survival ~50% for Stage IIIC with optimal treatment.`
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
      modelName: 'Model A',
      reasoningTrace: `Case analysis:
1. 72-year-old male with newly diagnosed multiple myeloma
2. CRAB criteria present
3. HIGH-RISK: del(17p) detected
4. R-ISS Stage III

Treatment approach:
- High-risk disease requires aggressive therapy
- Transplant eligibility borderline at age 72`,
      recommendation: `Recommended Treatment Plan:

1. Immediate supportive care:
   - IV hydration for hypercalcemia
   - Denosumab 120 mg monthly
   - Vertebroplasty evaluation for T10

2. Induction therapy: VRd (Bortezomib + Lenalidomide + Dexamethasone)
   - Plan for 4-6 cycles
   - Lenalidomide dose reduction for CKD

3. Transplant evaluation after 2-3 cycles
4. Maintenance: Lenalidomide-based

5. Supportive care: VTE prophylaxis, infection prophylaxis`
    },
    aiOutputB: {
      modelName: 'Model B',
      reasoningTrace: `High-risk multiple myeloma with del(17p) - requires intensified therapy.

Critical points:
- del(17p) is highest-risk cytogenetic abnormality
- Standard VRd is INSUFFICIENT for high-risk disease
- Daratumumab-based quadruplet now standard for high-risk
- Age 72 with ECOG 2 - transplant candidacy uncertain
- CKD requires dose adjustments

Must use evidence-based high-risk regimen, not standard VRd.`,
      recommendation: `Recommended Treatment Plan:

HIGH-RISK MYELOMA PROTOCOL:

1. Immediate management:
   - IV fluids + zoledronic acid for hypercalcemia
   - Denosumab 120 mg SC monthly (preferred over bisphosphonates given CKD)
   - Interventional radiology consult for T10 vertebroplasty/kyphoplasty
   - Pain management

2. Induction: Daratumumab-VRd (D-VRd) quadruplet
   - Daratumumab 16 mg/kg weekly x 8, then q2 weeks
   - Bortezomib 1.3 mg/m² SC days 1, 4, 8, 11
   - Lenalidomide 15 mg days 1-14 (reduced for CKD)
   - Dexamethasone 40 mg weekly (20 mg if age >75)
   - Plan for 4-6 cycles

3. Transplant assessment:
   - Formal evaluation after 2 cycles if responding
   - Age 72 with ECOG 2 is borderline - depends on response and improvement in PS
   - If transplant-eligible: Stem cell collection after 4 cycles

4. Maintenance (critical for del(17p)):
   - Lenalidomide PLUS bortezomib (not lenalidomide alone)
   - Consider daratumumab maintenance per CASSIOPEIA

5. Supportive care:
   - Acyclovir prophylaxis
   - PCP prophylaxis
   - VTE prophylaxis with aspirin (or LMWH if high-risk)
   - IVIG if recurrent infections

Prognosis: del(17p) historically poor prognosis (median OS 2-3 years), but improving with modern quadruplet regimens.`
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
      modelName: 'Model A',
      reasoningTrace: `Case evaluation:
1. 56-year-old male with advanced laryngeal SCC
2. T4a (cartilage invasion) N2b M0 = Stage IVA
3. HPV/p16 negative
4. Vocal cord fixed
5. Patient concerned about voice preservation`,
      recommendation: `Recommended Treatment Plan:

Given the patient's strong desire for voice preservation, I recommend definitive chemoradiation:

1. Smoking cessation: Mandatory
2. Dental evaluation
3. PEG tube placement
4. Chemoradiation:
   - Cisplatin 40 mg/m² weekly with concurrent IMRT
   - 70 Gy to primary + involved nodes
5. Post-treatment PET-CT at 12 weeks
6. Salvage laryngectomy for residual disease

The ~50% chance of organ preservation is worth attempting given how important voice is to this patient.`
    },
    aiOutputB: {
      modelName: 'Model B',
      reasoningTrace: `T4a laryngeal cancer with cartilage invasion - challenging case for organ preservation.

Key considerations:
- T4a = cartilage invasion - historically poor organ preservation rates
- Vocal cord already fixed - voice function already significantly impaired
- HPV-negative - worse prognosis than HPV-positive H&N cancers
- Ongoing smoking/alcohol - affects treatment outcomes
- Patient wants voice preservation but must understand realistic expectations

RTOG 91-11 included T4 patients but organ preservation success was lower. Current voice is already very abnormal due to cord fixation.`,
      recommendation: `Recommended Treatment Plan:

CRITICAL: Honest discussion about options and realistic expectations.

Option 1 - RECOMMENDED: Total laryngectomy + bilateral neck dissection
- Best local control for T4a disease with cartilage invasion
- Adjuvant radiation (with cisplatin if positive margins or extranodal extension)
- Voice rehabilitation: Tracheoesophageal puncture (TEP) speech - most patients achieve intelligible speech
- 5-year survival: ~50-60%

Option 2 - Organ preservation attempt (if patient strongly prefers after counseling):
- Concurrent chemoradiation: Cisplatin 100 mg/m² days 1, 22, 43 + 70 Gy IMRT
- Success rate for T4a: Only ~40-50% (vs 70%+ for T3)
- Patient must understand:
  * Current voice already severely impaired (fixed cord)
  * Even if larynx preserved, voice quality may not recover
  * High risk of requiring salvage laryngectomy (more morbid after radiation)

MANDATORY regardless of choice:
1. Smoking cessation - improves outcomes by 30-50%
2. Alcohol cessation counseling
3. Dental clearance
4. Nutrition optimization
5. Speech pathology consultation

My recommendation: Given T4a with cartilage invasion and already-fixed vocal cord, total laryngectomy offers best chance of cure. TEP speech rehabilitation allows communication. Organ preservation for T4a has high failure rate.`
    }
  }
]
