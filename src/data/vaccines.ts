export interface Ingredient {
  name: string;
  role: string;
  safetyClassification: string;
  notes: string;
  scrutinized?: boolean;
  scrutinizedExplainer?: string;
}

export interface EfficacyData {
  metric: string;
  rate: number;
  confidenceInterval: [number, number];
  source: string;
}

export interface AdverseEvent {
  event: string;
  frequency: string;
  severity: 'Common' | 'Uncommon' | 'Rare' | 'Very Rare';
  rate: string;
}

export interface VaccinationRatePoint {
  year: number;
  rate: number;
  cases: number;
}

export interface ThreatInfo {
  outbreakStatus: string;
  globalRisk: 'Low' | 'Moderate' | 'High' | 'Critical';
  regionalRisks: { region: string; level: 'Low' | 'Moderate' | 'High' | 'Critical' }[];
  herdImmunityThreshold: number;
  currentCoverage: number;
  alertLevel: string;
  alertSource: string;
}

export interface TimelineEvent {
  year: number;
  event: string;
  type: 'discovery' | 'outbreak' | 'milestone' | 'vaccine';
}

export interface CaseComparison {
  period: string;
  cases: number;
  deaths: number;
}

export interface ProConPoint {
  claim: string;
  sourceType: 'Scientific consensus' | 'Individual rights argument' | 'Emerging research' | 'Anecdotal' | 'Contested claim';
  detail: string;
}

export interface VaccineSource {
  name: string;
  url: string;
  description: string;
}

export interface VaccineData {
  id: string;
  name: string;
  pathogen: string;
  disease: string;
  mechanism: string;
  mechanismType: string;
  recommendedFor: string[];
  ingredients: Ingredient[];
  efficacy: EfficacyData[];
  adverseEvents: AdverseEvent[];
  vaccinationRates: VaccinationRatePoint[];
  lastUpdated: string;
  threat: ThreatInfo;
  timeline: TimelineEvent[];
  preVaccine: CaseComparison;
  postVaccine: CaseComparison;
  historicalContext: string;
  pros: ProConPoint[];
  cons: ProConPoint[];
  sources: VaccineSource[];
}

export const vaccines: Record<string, VaccineData> = {
  'covid-19': {
    id: 'covid-19',
    name: 'COVID-19 (mRNA)',
    pathogen: 'SARS-CoV-2',
    disease: 'COVID-19',
    mechanism: 'mRNA vaccines deliver genetic instructions for cells to produce the SARS-CoV-2 spike protein. The immune system recognizes this protein as foreign and builds antibodies and T-cells to fight future infection. The mRNA is broken down by the body within days and does not alter DNA.',
    mechanismType: 'mRNA',
    recommendedFor: [
      'Adults 18+ (primary series)',
      'Adolescents 12-17',
      'Children 6 months - 11 years (reduced dose)',
      'Immunocompromised individuals (additional doses)',
      'Healthcare workers (priority)',
      'Adults 65+ (boosters recommended annually)',
    ],
    ingredients: [
      { name: 'mRNA (nucleoside-modified)', role: 'Active ingredient — encodes spike protein', safetyClassification: 'Active pharmaceutical ingredient', notes: 'Degrades within days; does not enter cell nucleus' },
      { name: 'Lipid ALC-0315', role: 'Ionizable lipid — forms lipid nanoparticle shell', safetyClassification: 'Novel excipient', notes: 'Enables mRNA delivery into cells; metabolized by the body', scrutinized: true, scrutinizedExplainer: 'ALC-0315 is a proprietary lipid not used in previous vaccines. It was developed specifically for mRNA delivery. Toxicology studies were conducted as part of the EUA process, though some researchers have called for longer-term follow-up data.' },
      { name: 'Lipid ALC-0159', role: 'PEGylated lipid — stabilizes nanoparticle', safetyClassification: 'Generally recognized as safe (with caveats)', notes: 'PEG compounds are widely used in medicines and consumer products', scrutinized: true, scrutinizedExplainer: 'Polyethylene glycol (PEG) is common in laxatives, cosmetics, and injectable drugs. Rare allergic reactions to PEG have been documented. The CDC recommends a 15-30 minute observation period post-vaccination for this reason.' },
      { name: 'DSPC', role: 'Structural lipid — supports nanoparticle integrity', safetyClassification: 'Generally recognized as safe', notes: 'Naturally occurring phospholipid found in cell membranes' },
      { name: 'Cholesterol', role: 'Structural lipid — stabilizes lipid nanoparticle', safetyClassification: 'Generally recognized as safe', notes: 'Same cholesterol found naturally in the body' },
      { name: 'Sucrose', role: 'Cryoprotectant — prevents damage during freezing', safetyClassification: 'Generally recognized as safe', notes: 'Table sugar; used in many injectable formulations' },
      { name: 'Tromethamine', role: 'Buffer — maintains pH stability', safetyClassification: 'Generally recognized as safe', notes: 'Common pharmaceutical buffer used in many IV medications' },
      { name: 'Sodium chloride', role: 'Tonicity agent — matches body fluid concentration', safetyClassification: 'Generally recognized as safe', notes: 'Saline; standard in injectable solutions' },
      { name: 'Potassium chloride', role: 'Tonicity agent', safetyClassification: 'Generally recognized as safe', notes: 'Essential mineral; used in many IV solutions' },
      { name: 'Dibasic sodium phosphate', role: 'Buffer', safetyClassification: 'Generally recognized as safe', notes: 'Common food and pharmaceutical additive' },
    ],
    efficacy: [
      { metric: 'Prevention of symptomatic infection (original strain)', rate: 95, confidenceInterval: [90.3, 97.6], source: 'Polack et al., NEJM 2020' },
      { metric: 'Prevention of severe disease / hospitalization', rate: 89, confidenceInterval: [84, 93], source: 'CDC MMWR, 2022' },
      { metric: 'Prevention of death (within 6 months)', rate: 91, confidenceInterval: [85, 95], source: 'WHO Global Analysis, 2022' },
      { metric: 'Effectiveness vs. Omicron (boosted)', rate: 67, confidenceInterval: [58, 74], source: 'UKHSA Report, 2022' },
    ],
    adverseEvents: [
      { event: 'Injection site pain', frequency: '1 in 1.2', severity: 'Common', rate: '84.1%' },
      { event: 'Fatigue', frequency: '1 in 1.6', severity: 'Common', rate: '62.9%' },
      { event: 'Headache', frequency: '1 in 1.8', severity: 'Common', rate: '55.1%' },
      { event: 'Muscle pain', frequency: '1 in 2.6', severity: 'Common', rate: '38.3%' },
      { event: 'Chills', frequency: '1 in 3.2', severity: 'Common', rate: '31.9%' },
      { event: 'Fever (>38°C)', frequency: '1 in 7', severity: 'Uncommon', rate: '14.2%' },
      { event: 'Lymphadenopathy', frequency: '1 in 90', severity: 'Uncommon', rate: '1.1%' },
      { event: 'Bell\'s Palsy', frequency: '1 in 20,000', severity: 'Rare', rate: '0.005%' },
      { event: 'Myocarditis (males 16-24)', frequency: '1 in 15,000', severity: 'Rare', rate: '0.007%' },
      { event: 'Anaphylaxis', frequency: '1 in 200,000', severity: 'Very Rare', rate: '0.0005%' },
    ],
    vaccinationRates: [
      { year: 2020, rate: 0, cases: 83200000 },
      { year: 2021, rate: 42, cases: 122000000 },
      { year: 2022, rate: 64, cases: 31400000 },
      { year: 2023, rate: 70, cases: 7200000 },
      { year: 2024, rate: 68, cases: 3100000 },
    ],
    lastUpdated: '2024-11-15',
    threat: {
      outbreakStatus: 'Endemic circulation — seasonal surges expected',
      globalRisk: 'Moderate',
      regionalRisks: [
        { region: 'North America', level: 'Low' },
        { region: 'Europe', level: 'Low' },
        { region: 'Southeast Asia', level: 'Moderate' },
        { region: 'Sub-Saharan Africa', level: 'Moderate' },
        { region: 'South America', level: 'Low' },
      ],
      herdImmunityThreshold: 85,
      currentCoverage: 68,
      alertLevel: 'PHEIC Ended — Ongoing Surveillance',
      alertSource: 'WHO',
    },
    timeline: [
      { year: 2019, event: 'Novel coronavirus identified in Wuhan, China', type: 'discovery' },
      { year: 2020, event: 'WHO declares global pandemic; 1.8M deaths in first year', type: 'outbreak' },
      { year: 2020, event: 'Pfizer-BioNTech mRNA vaccine receives EUA (Dec 11)', type: 'vaccine' },
      { year: 2021, event: 'Delta variant causes global surge; vaccines widely deployed', type: 'outbreak' },
      { year: 2021, event: 'Over 8 billion vaccine doses administered globally', type: 'milestone' },
      { year: 2022, event: 'Omicron variant dominates; reduced vaccine effectiveness vs. infection', type: 'outbreak' },
      { year: 2023, event: 'WHO ends COVID-19 PHEIC designation (May 5)', type: 'milestone' },
      { year: 2024, event: 'Updated boosters target JN.1 and KP.2 variants', type: 'vaccine' },
    ],
    preVaccine: { period: '2020 (pre-vaccine)', cases: 83200000, deaths: 1813000 },
    postVaccine: { period: '2023-2024 (post-vaccine era)', cases: 5150000, deaths: 72000 },
    historicalContext: 'COVID-19 prompted the fastest vaccine development in history. The mRNA platform, developed over decades of research, was deployed at scale for the first time. An estimated 14.4 million deaths were averted by vaccination in the first year of rollout (Lancet, 2022). The pandemic also triggered unprecedented public debate about vaccine mandates, emergency authorization processes, and long-term safety monitoring.',
    pros: [
      { claim: 'Prevented an estimated 14.4 million deaths globally in the first year of rollout', sourceType: 'Scientific consensus', detail: 'Mathematical modeling published in The Lancet Infectious Diseases (Watson et al., 2022) estimated deaths averted using counterfactual analysis.' },
      { claim: 'Dramatically reduces risk of severe disease, hospitalization, and death', sourceType: 'Scientific consensus', detail: 'Multiple real-world effectiveness studies across dozens of countries consistently show 80-95% reduction in severe outcomes.' },
      { claim: 'mRNA technology enables rapid variant-specific updates', sourceType: 'Scientific consensus', detail: 'The mRNA platform allows reformulation in weeks rather than months, enabling updated boosters for emerging variants.' },
      { claim: 'Reduces strain on healthcare systems during surges', sourceType: 'Scientific consensus', detail: 'Hospital data consistently showed vaccinated populations required fewer ICU beds and ventilators.' },
      { claim: 'Extensive safety monitoring through VAERS, V-safe, and global pharmacovigilance', sourceType: 'Scientific consensus', detail: 'Over 13 billion doses administered globally with continuous safety monitoring — one of the largest safety datasets in pharmaceutical history.' },
    ],
    cons: [
      { claim: 'Long-term safety data is inherently limited due to novelty of mRNA platform', sourceType: 'Emerging research', detail: 'While short-to-medium term safety is well-documented, the mRNA vaccine platform has only been in widespread use since 2021. Longitudinal studies are ongoing.' },
      { claim: 'Myocarditis risk in young males, particularly after second dose', sourceType: 'Scientific consensus', detail: 'CDC and multiple studies confirmed elevated myocarditis risk in males 16-24 (approx. 1 in 15,000). Most cases were mild and self-resolving, but the signal is real and acknowledged.' },
      { claim: 'Vaccine mandates raised significant civil liberties concerns', sourceType: 'Individual rights argument', detail: 'Workplace and institutional mandates were challenged legally and ethically. Critics argued bodily autonomy should not be overridden by public health policy, regardless of efficacy data.' },
      { claim: 'Waning efficacy requires repeated boosters, raising compliance and risk-benefit questions', sourceType: 'Emerging research', detail: 'Protection against infection drops significantly within 4-6 months. The need for repeated doses has prompted debate about optimal dosing schedules and population-level strategy.' },
      { claim: 'Breakthrough infections undermined public trust in initial messaging', sourceType: 'Contested claim', detail: 'Early public health messaging emphasized "stopping transmission," which was not fully borne out by real-world data. Revised messaging focused on severe disease prevention, but the shift eroded confidence for some.' },
      { claim: 'Reports of post-vaccination syndromes (fatigue, neurological symptoms) warrant investigation', sourceType: 'Emerging research', detail: 'Some individuals report prolonged symptoms post-vaccination. Research is ongoing to distinguish vaccine-related effects from coincidental conditions and long COVID overlap.' },
    ],
    sources: [
      { name: 'Polack FP, et al. "Safety and Efficacy of the BNT162b2 mRNA Covid-19 Vaccine"', url: 'https://www.nejm.org/doi/full/10.1056/nejmoa2034577', description: 'Original Phase 3 clinical trial results published in the New England Journal of Medicine (NEJM), December 2020.' },
      { name: 'Watson OJ, et al. "Global impact of the first year of COVID-19 vaccination"', url: 'https://www.thelancet.com/journals/laninf/article/PIIS1473-3099(22)00320-6/fulltext', description: 'Lancet Infectious Diseases modeling study estimating 14.4 million deaths averted by vaccination.' },
      { name: 'CDC COVID-19 Vaccine Safety Updates', url: 'https://www.cdc.gov/coronavirus/2019-ncov/vaccines/safety.html', description: 'Ongoing safety monitoring data from VAERS and V-safe systems.' },
      { name: 'WHO COVID-19 Dashboard', url: 'https://covid19.who.int/', description: 'Global case counts, death counts, and vaccination coverage data.' },
      { name: 'UKHSA Vaccine Surveillance Reports', url: 'https://www.gov.uk/government/publications/covid-19-vaccine-weekly-surveillance-reports', description: 'UK Health Security Agency weekly reports on vaccine effectiveness against variants.' },
      { name: 'Oster ME, et al. "Myocarditis Cases After mRNA-Based COVID-19 Vaccination"', url: 'https://jamanetwork.com/journals/jama/fullarticle/2788346', description: 'JAMA study documenting myocarditis incidence post-vaccination by age and sex.' },
    ],
  },

  'flu': {
    id: 'flu',
    name: 'Influenza (Seasonal Flu)',
    pathogen: 'Influenza A & B viruses',
    disease: 'Influenza',
    mechanism: 'Inactivated influenza vaccines contain killed virus particles or recombinant hemagglutinin proteins. The immune system produces antibodies against surface proteins (hemagglutinin and neuraminidase) to prevent future infection. Quadrivalent formulations target two influenza A and two influenza B strains selected each season.',
    mechanismType: 'Inactivated / Recombinant',
    recommendedFor: [
      'All persons aged 6 months and older',
      'Adults 65+ (high-dose formulation recommended)',
      'Pregnant individuals',
      'Children 6 months - 8 years (may need two doses initially)',
      'Healthcare workers',
      'People with chronic medical conditions',
    ],
    ingredients: [
      { name: 'Inactivated influenza virus (4 strains)', role: 'Active ingredient — stimulates immune response', safetyClassification: 'Active pharmaceutical ingredient', notes: 'Killed virus; cannot cause influenza' },
      { name: 'Ovalbumin (egg protein)', role: 'Residual from manufacturing process', safetyClassification: 'Generally recognized as safe', notes: 'Present in trace amounts from egg-based production', scrutinized: true, scrutinizedExplainer: 'People with egg allergies were historically advised against flu vaccines. Current CDC guidance states that egg-allergic individuals can receive any age-appropriate flu vaccine, as severe reactions are exceedingly rare. Egg-free recombinant options (Flublok) are also available.' },
      { name: 'Formaldehyde', role: 'Inactivating agent — kills the virus', safetyClassification: 'Residual in trace amounts', notes: 'The body naturally produces and metabolizes formaldehyde; vaccine contains far less than natural blood levels', scrutinized: true, scrutinizedExplainer: 'Formaldehyde is a known carcinogen at high industrial exposure levels. The amount in a vaccine dose (~0.02 mg) is hundreds of times less than the amount naturally present in the body (~50,000 mg). It is rapidly metabolized.' },
      { name: 'Thimerosal (multi-dose vials only)', role: 'Preservative — prevents contamination', safetyClassification: 'Reviewed and cleared by major health bodies', notes: 'Contains ethylmercury, which is metabolized quickly; not present in single-dose formats', scrutinized: true, scrutinizedExplainer: 'Thimerosal contains ethylmercury (not methylmercury, the type that bioaccumulates). Multiple large-scale studies found no link between thimerosal and autism or neurodevelopmental disorders. It was removed from most childhood vaccines as a precautionary measure, but remains in some multi-dose flu vials.' },
      { name: 'Polysorbate 80', role: 'Emulsifier — stabilizes vaccine components', safetyClassification: 'Generally recognized as safe', notes: 'Widely used in food products and pharmaceuticals' },
      { name: 'Sodium phosphate', role: 'Buffer — maintains pH', safetyClassification: 'Generally recognized as safe', notes: 'Common food and pharmaceutical additive' },
      { name: 'Sodium chloride', role: 'Tonicity agent', safetyClassification: 'Generally recognized as safe', notes: 'Saline solution' },
    ],
    efficacy: [
      { metric: 'Prevention of medically attended illness (well-matched season)', rate: 60, confidenceInterval: [50, 68], source: 'CDC Flu Vaccine Effectiveness Studies' },
      { metric: 'Prevention of hospitalization (adults)', rate: 40, confidenceInterval: [30, 52], source: 'CDC MMWR, 2023' },
      { metric: 'Prevention of ICU admission (children)', rate: 74, confidenceInterval: [58, 84], source: 'NEJM, 2022' },
      { metric: 'Prevention of death (adults 65+)', rate: 48, confidenceInterval: [34, 59], source: 'Cochrane Review, 2018' },
    ],
    adverseEvents: [
      { event: 'Injection site soreness', frequency: '1 in 1.5', severity: 'Common', rate: '65%' },
      { event: 'Low-grade fever', frequency: '1 in 10', severity: 'Common', rate: '10%' },
      { event: 'Muscle aches', frequency: '1 in 5', severity: 'Common', rate: '20%' },
      { event: 'Headache', frequency: '1 in 5', severity: 'Common', rate: '20%' },
      { event: 'Fatigue', frequency: '1 in 4', severity: 'Common', rate: '25%' },
      { event: 'Guillain-Barre Syndrome', frequency: '1 in 1,000,000', severity: 'Very Rare', rate: '0.0001%' },
      { event: 'Severe allergic reaction', frequency: '1 in 1,000,000', severity: 'Very Rare', rate: '0.0001%' },
    ],
    vaccinationRates: [
      { year: 2015, rate: 42, cases: 34000000 },
      { year: 2016, rate: 43, cases: 29000000 },
      { year: 2017, rate: 37, cases: 45000000 },
      { year: 2018, rate: 45, cases: 36000000 },
      { year: 2019, rate: 48, cases: 35000000 },
      { year: 2020, rate: 52, cases: 1800000 },
      { year: 2021, rate: 50, cases: 9000000 },
      { year: 2022, rate: 49, cases: 27000000 },
      { year: 2023, rate: 47, cases: 32000000 },
      { year: 2024, rate: 46, cases: 29000000 },
    ],
    lastUpdated: '2024-10-01',
    threat: {
      outbreakStatus: 'Seasonal — annual epidemics expected October through May (Northern Hemisphere)',
      globalRisk: 'Moderate',
      regionalRisks: [
        { region: 'North America', level: 'Moderate' },
        { region: 'Europe', level: 'Moderate' },
        { region: 'Southeast Asia', level: 'High' },
        { region: 'Sub-Saharan Africa', level: 'Low' },
        { region: 'Southern Hemisphere', level: 'Low' },
      ],
      herdImmunityThreshold: 80,
      currentCoverage: 47,
      alertLevel: 'Seasonal Surveillance Active',
      alertSource: 'CDC / WHO FluNet',
    },
    timeline: [
      { year: 1918, event: 'Spanish flu pandemic kills an estimated 50-100 million worldwide', type: 'outbreak' },
      { year: 1933, event: 'Influenza virus first isolated in a laboratory', type: 'discovery' },
      { year: 1945, event: 'First inactivated influenza vaccine licensed in the US', type: 'vaccine' },
      { year: 1957, event: 'Asian flu pandemic (H2N2) — 1.1 million deaths globally', type: 'outbreak' },
      { year: 1968, event: 'Hong Kong flu pandemic (H3N2) — 1 million deaths globally', type: 'outbreak' },
      { year: 2003, event: 'First live-attenuated influenza vaccine (FluMist) approved', type: 'vaccine' },
      { year: 2009, event: 'H1N1 "Swine Flu" pandemic — estimated 284,000 deaths', type: 'outbreak' },
      { year: 2013, event: 'Quadrivalent vaccines (4-strain) become standard', type: 'vaccine' },
      { year: 2020, event: 'COVID measures dramatically reduce flu transmission', type: 'milestone' },
    ],
    preVaccine: { period: '1918 (pandemic year)', cases: 500000000, deaths: 50000000 },
    postVaccine: { period: '2023-2024 (modern era, US only)', cases: 32000000, deaths: 22000 },
    historicalContext: 'Influenza remains one of the most persistent infectious disease threats. The 1918 pandemic was the deadliest in modern history. Seasonal flu vaccines have been available since the 1940s, but their moderate and variable efficacy — combined with the virus\'s rapid antigenic drift — means influenza continues to cause significant annual morbidity and mortality. Development of a universal flu vaccine remains a major research priority.',
    pros: [
      { claim: 'Prevents an estimated 4.4 million illnesses and 7,500 deaths annually in the US alone', sourceType: 'Scientific consensus', detail: 'CDC modeling estimates based on annual vaccine effectiveness studies and surveillance data.' },
      { claim: 'Reduces severity even when not perfectly matched to circulating strains', sourceType: 'Scientific consensus', detail: 'Cross-protection from partial antigenic similarity still provides meaningful reduction in hospitalization and death.' },
      { claim: 'Safe and well-studied with decades of surveillance data', sourceType: 'Scientific consensus', detail: 'Flu vaccines have been administered billions of times since the 1940s with robust safety monitoring.' },
      { claim: 'Protects vulnerable populations through community coverage', sourceType: 'Scientific consensus', detail: 'Vaccinating children and working-age adults reduces transmission to elderly and immunocompromised individuals.' },
    ],
    cons: [
      { claim: 'Efficacy varies significantly year-to-year (20-60%) depending on strain match', sourceType: 'Scientific consensus', detail: 'Vaccine strains are selected 6+ months in advance. If the virus drifts, effectiveness drops substantially. This is an acknowledged limitation.' },
      { claim: 'Annual vaccination requirement reduces public compliance', sourceType: 'Emerging research', detail: 'Unlike childhood vaccines that provide lasting immunity, flu vaccines require annual updates, leading to vaccination fatigue.' },
      { claim: 'Some formulations contain thimerosal, a mercury-based preservative', sourceType: 'Contested claim', detail: 'While scientific evidence consistently shows thimerosal is safe, its presence remains a concern for some individuals. Thimerosal-free options are widely available.' },
      { claim: 'Healthy adults with low risk may question individual benefit vs. population-level strategy', sourceType: 'Individual rights argument', detail: 'For low-risk adults, the individual benefit is smaller, leading some to argue the decision should be optional rather than broadly recommended.' },
    ],
    sources: [
      { name: 'CDC Influenza (Flu) Vaccine Effectiveness', url: 'https://www.cdc.gov/flu/vaccines-work/vaccineeffect.htm', description: 'Annual estimates of flu vaccine effectiveness from the US Flu VE Network.' },
      { name: 'WHO Influenza Fact Sheet', url: 'https://www.who.int/news-room/fact-sheets/detail/influenza-(seasonal)', description: 'Global overview of seasonal influenza epidemiology and prevention.' },
      { name: 'Cochrane Review: Influenza Vaccines for Healthy Adults', url: 'https://www.cochranelibrary.com/cdsr/doi/10.1002/14651858.CD001269.pub6/full', description: 'Systematic review of flu vaccine efficacy and effectiveness in healthy adults.' },
    ],
  },

  'mmr': {
    id: 'mmr',
    name: 'MMR (Measles, Mumps, Rubella)',
    pathogen: 'Measles, Mumps, and Rubella viruses',
    disease: 'Measles, Mumps, Rubella',
    mechanism: 'The MMR vaccine contains live-attenuated (weakened) versions of all three viruses. These weakened viruses replicate briefly in the body, stimulating a robust immune response — including antibodies and memory cells — without causing the full disease. Two doses provide long-lasting immunity in 97% of recipients for measles.',
    mechanismType: 'Live-attenuated',
    recommendedFor: [
      'Children at 12-15 months (first dose)',
      'Children at 4-6 years (second dose)',
      'Adults born after 1957 without evidence of immunity',
      'Healthcare workers (two doses required)',
      'International travelers',
      'College students',
    ],
    ingredients: [
      { name: 'Live-attenuated measles virus (Edmonston strain)', role: 'Active ingredient', safetyClassification: 'Active pharmaceutical ingredient', notes: 'Weakened virus that cannot cause measles in healthy individuals' },
      { name: 'Live-attenuated mumps virus (Jeryl Lynn strain)', role: 'Active ingredient', safetyClassification: 'Active pharmaceutical ingredient', notes: 'Named after the daughter of vaccine developer Maurice Hilleman' },
      { name: 'Live-attenuated rubella virus (Wistar RA 27/3 strain)', role: 'Active ingredient', safetyClassification: 'Active pharmaceutical ingredient', notes: 'Grown in human diploid cell cultures' },
      { name: 'Gelatin (porcine)', role: 'Stabilizer — protects vaccine potency', safetyClassification: 'Generally recognized as safe', notes: 'Hydrolyzed gelatin from porcine sources; may be a concern for some religious dietary restrictions', scrutinized: true, scrutinizedExplainer: 'Gelatin is a common vaccine stabilizer derived from pigs. Some Jewish and Islamic scholars have ruled its use permissible for medical necessity, but it remains a concern for some individuals. Gelatin allergies, while rare, are the most common cause of allergic reactions to the MMR vaccine.' },
      { name: 'Neomycin', role: 'Antibiotic — prevents bacterial contamination during manufacturing', safetyClassification: 'Trace residual', notes: 'Present in trace amounts; contraindicated for those with neomycin allergy' },
      { name: 'Sorbitol', role: 'Stabilizer', safetyClassification: 'Generally recognized as safe', notes: 'Sugar alcohol commonly used in foods and medications' },
      { name: 'Sodium phosphate', role: 'Buffer', safetyClassification: 'Generally recognized as safe', notes: 'Maintains pH stability' },
      { name: 'Human serum albumin', role: 'Stabilizer', safetyClassification: 'Biological product', notes: 'Derived from screened human blood donations; used in many medical products' },
      { name: 'Fetal bovine serum', role: 'Cell culture growth medium', safetyClassification: 'Trace residual', notes: 'Used during virus production; washed away to trace levels in final product' },
      { name: 'WI-38 human diploid cell proteins', role: 'Residual from cell line used to grow rubella virus', safetyClassification: 'Trace residual', notes: 'Cell line established in 1962; no fetal tissue is in the vaccine itself', scrutinized: true, scrutinizedExplainer: 'The WI-38 cell line was derived from fetal lung tissue in the 1960s. The original cells have been replicated for decades — no new fetal tissue is used. This remains an ethical concern for some religious groups. Major religious bodies including the Vatican have stated that vaccination is morally acceptable when no alternatives exist.' },
    ],
    efficacy: [
      { metric: 'Measles prevention (2 doses)', rate: 97, confidenceInterval: [95, 99], source: 'CDC Pink Book, Chapter 13' },
      { metric: 'Mumps prevention (2 doses)', rate: 88, confidenceInterval: [82, 92], source: 'CDC Pink Book, Chapter 14' },
      { metric: 'Rubella prevention (1 dose)', rate: 97, confidenceInterval: [94, 99], source: 'CDC Pink Book, Chapter 20' },
      { metric: 'Duration of measles immunity', rate: 96, confidenceInterval: [92, 98], source: 'LeBaron et al., JID 2007 (20+ year follow-up)' },
    ],
    adverseEvents: [
      { event: 'Injection site reaction', frequency: '1 in 5', severity: 'Common', rate: '20%' },
      { event: 'Fever (>39.4°C)', frequency: '1 in 17', severity: 'Common', rate: '5-15%' },
      { event: 'Mild rash', frequency: '1 in 20', severity: 'Common', rate: '5%' },
      { event: 'Temporary joint pain (adult women)', frequency: '1 in 4', severity: 'Uncommon', rate: '25% of adult women' },
      { event: 'Febrile seizures', frequency: '1 in 3,000', severity: 'Rare', rate: '0.033%' },
      { event: 'Immune thrombocytopenic purpura (ITP)', frequency: '1 in 25,000', severity: 'Rare', rate: '0.004%' },
      { event: 'Encephalitis', frequency: '1 in 1,000,000', severity: 'Very Rare', rate: '0.0001%' },
    ],
    vaccinationRates: [
      { year: 2000, rate: 91, cases: 862200 },
      { year: 2005, rate: 93, cases: 580300 },
      { year: 2010, rate: 92, cases: 381400 },
      { year: 2015, rate: 92, cases: 254900 },
      { year: 2019, rate: 93, cases: 873022 },
      { year: 2020, rate: 86, cases: 157800 },
      { year: 2021, rate: 81, cases: 128200 },
      { year: 2022, rate: 83, cases: 171200 },
      { year: 2023, rate: 84, cases: 321582 },
      { year: 2024, rate: 83, cases: 198400 },
    ],
    lastUpdated: '2024-09-20',
    threat: {
      outbreakStatus: 'Active outbreaks in multiple regions due to declining vaccination rates',
      globalRisk: 'High',
      regionalRisks: [
        { region: 'North America', level: 'Moderate' },
        { region: 'Europe', level: 'High' },
        { region: 'Southeast Asia', level: 'High' },
        { region: 'Sub-Saharan Africa', level: 'Critical' },
        { region: 'Middle East', level: 'High' },
      ],
      herdImmunityThreshold: 95,
      currentCoverage: 83,
      alertLevel: 'WHO Grade 2 Emergency — Global Measles Resurgence',
      alertSource: 'WHO / CDC',
    },
    timeline: [
      { year: 1757, event: 'Scottish physician Francis Home demonstrates measles is caused by an infectious agent', type: 'discovery' },
      { year: 1846, event: 'Peter Panum documents measles epidemiology in the Faroe Islands', type: 'milestone' },
      { year: 1963, event: 'First measles vaccine licensed in the United States', type: 'vaccine' },
      { year: 1969, event: 'Rubella vaccine licensed; combined MMR introduced in 1971', type: 'vaccine' },
      { year: 1998, event: 'Wakefield publishes fraudulent study linking MMR to autism (later retracted)', type: 'milestone' },
      { year: 2000, event: 'Measles declared eliminated in the United States', type: 'milestone' },
      { year: 2010, event: 'Wakefield\'s medical license revoked; study fully discredited', type: 'milestone' },
      { year: 2019, event: 'Global measles resurgence — 869,770 cases reported, highest in 23 years', type: 'outbreak' },
      { year: 2023, event: 'WHO reports 321,582 confirmed cases; warns of "imminent threat"', type: 'outbreak' },
    ],
    preVaccine: { period: '1950s (US, annual average)', cases: 4000000, deaths: 48000 },
    postVaccine: { period: '2023 (US)', cases: 58, deaths: 0 },
    historicalContext: 'Before vaccination, measles infected virtually every child and killed an estimated 2.6 million people annually worldwide. The MMR vaccine became one of the most successful public health interventions in history. However, a fraudulent 1998 study by Andrew Wakefield falsely linking MMR to autism — later retracted and thoroughly debunked — triggered a decline in vaccination rates that continues to have consequences. The WHO has warned that declining measles coverage poses an "imminent threat" to global health.',
    pros: [
      { claim: 'Measles vaccination has prevented an estimated 56 million deaths between 2000-2021', sourceType: 'Scientific consensus', detail: 'WHO/CDC joint estimate based on mathematical modeling of mortality reduction attributable to measles vaccination campaigns.' },
      { claim: '97% effective after two doses — one of the most effective vaccines ever developed', sourceType: 'Scientific consensus', detail: 'Decades of clinical data and post-marketing surveillance confirm exceptionally high and durable efficacy.' },
      { claim: 'The Wakefield autism-MMR link has been conclusively debunked by extensive research', sourceType: 'Scientific consensus', detail: 'Over 20 studies involving millions of children have found no association between MMR and autism. Wakefield\'s paper was retracted for fraud.' },
      { claim: 'Provides lifetime immunity for the vast majority of recipients', sourceType: 'Scientific consensus', detail: 'Unlike some vaccines, MMR immunity typically lasts decades to a lifetime after two doses.' },
    ],
    cons: [
      { claim: 'Live-attenuated vaccines carry a small risk for immunocompromised individuals', sourceType: 'Scientific consensus', detail: 'People with severely weakened immune systems (e.g., chemotherapy patients) cannot safely receive live vaccines. They depend on herd immunity for protection.' },
      { claim: 'Febrile seizures occur in approximately 1 in 3,000 doses', sourceType: 'Scientific consensus', detail: 'While febrile seizures are generally benign and self-limiting, they are distressing for parents. The risk is slightly higher with the first dose given at 12-15 months.' },
      { claim: 'Use of fetal cell lines in production is ethically objectionable to some', sourceType: 'Individual rights argument', detail: 'The rubella component is grown in the WI-38 cell line, derived from fetal tissue in the 1960s. While no new fetal tissue is used, this remains a moral concern for some religious groups.' },
      { claim: 'Vaccine-strain virus shedding can theoretically occur after vaccination', sourceType: 'Contested claim', detail: 'Live-attenuated vaccine viruses can be detected in throat or urine briefly after vaccination. However, secondary transmission of vaccine-strain measles is not documented in normal circumstances.' },
    ],
    sources: [
      { name: 'CDC Pink Book: Measles Chapter', url: 'https://www.cdc.gov/vaccines/pubs/pinkbook/meas.html', description: 'Comprehensive reference on measles epidemiology, vaccine, and recommendations.' },
      { name: 'WHO Measles Fact Sheet', url: 'https://www.who.int/news-room/fact-sheets/detail/measles', description: 'Global measles situation, vaccination progress, and outbreak data.' },
      { name: 'Retraction of Wakefield et al. (The Lancet, 2010)', url: 'https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(97)11096-0/fulltext', description: 'The Lancet\'s formal retraction of the 1998 study that fraudulently linked MMR to autism.' },
    ],
  },

  'polio': {
    id: 'polio',
    name: 'Polio (IPV)',
    pathogen: 'Poliovirus (types 1, 2, 3)',
    disease: 'Poliomyelitis',
    mechanism: 'The inactivated polio vaccine (IPV) contains killed poliovirus of all three serotypes. When injected, the immune system recognizes viral proteins and produces neutralizing antibodies. Unlike the oral polio vaccine (OPV), IPV cannot revert to a virulent form and is now standard in most developed countries.',
    mechanismType: 'Inactivated',
    recommendedFor: [
      'Children at 2 months (first dose)',
      'Children at 4 months (second dose)',
      'Children at 6-18 months (third dose)',
      'Children at 4-6 years (booster)',
      'Adults traveling to endemic/outbreak regions',
      'Healthcare workers exposed to poliovirus',
    ],
    ingredients: [
      { name: 'Inactivated poliovirus types 1, 2, 3', role: 'Active ingredient', safetyClassification: 'Active pharmaceutical ingredient', notes: 'Killed virus grown in Vero monkey kidney cells' },
      { name: 'Formaldehyde', role: 'Inactivating agent', safetyClassification: 'Residual in trace amounts', notes: 'Used to kill the virus; present in trace quantities far below natural body levels', scrutinized: true, scrutinizedExplainer: 'Used to inactivate the poliovirus. Residual amounts in the vaccine (~0.02 mg) are a tiny fraction of the formaldehyde naturally circulating in the human body (~50,000 mg). The body metabolizes it rapidly through normal enzymatic pathways.' },
      { name: '2-Phenoxyethanol', role: 'Preservative', safetyClassification: 'Generally recognized as safe', notes: 'Antimicrobial preservative also used in cosmetics and skin care products' },
      { name: 'Neomycin', role: 'Antibiotic — prevents bacterial contamination', safetyClassification: 'Trace residual', notes: 'Used during manufacturing; trace amounts remain' },
      { name: 'Streptomycin', role: 'Antibiotic — prevents bacterial contamination', safetyClassification: 'Trace residual', notes: 'Used during manufacturing; trace amounts remain' },
      { name: 'Polymyxin B', role: 'Antibiotic — prevents bacterial contamination', safetyClassification: 'Trace residual', notes: 'Used during manufacturing; trace amounts remain' },
      { name: 'Medium 199 (amino acids, vitamins, minerals)', role: 'Cell culture medium', safetyClassification: 'Generally recognized as safe', notes: 'Nutrient solution for growing cells; washed from final product' },
    ],
    efficacy: [
      { metric: 'Prevention of paralytic polio (3 doses)', rate: 99, confidenceInterval: [97, 100], source: 'CDC Pink Book, Chapter 18' },
      { metric: 'Seroconversion rate after 3 doses', rate: 99, confidenceInterval: [98, 100], source: 'WHO Position Paper, 2022' },
      { metric: 'Duration of immunity (with booster)', rate: 98, confidenceInterval: [95, 99], source: 'Long-term serological studies' },
    ],
    adverseEvents: [
      { event: 'Injection site redness/swelling', frequency: '1 in 3', severity: 'Common', rate: '33%' },
      { event: 'Mild fever', frequency: '1 in 20', severity: 'Common', rate: '5%' },
      { event: 'Irritability (infants)', frequency: '1 in 5', severity: 'Common', rate: '20%' },
      { event: 'Serious allergic reaction', frequency: '1 in 1,000,000', severity: 'Very Rare', rate: '0.0001%' },
    ],
    vaccinationRates: [
      { year: 1980, rate: 20, cases: 52552 },
      { year: 1990, rate: 75, cases: 23484 },
      { year: 2000, rate: 85, cases: 2971 },
      { year: 2005, rate: 87, cases: 1979 },
      { year: 2010, rate: 86, cases: 1352 },
      { year: 2015, rate: 86, cases: 74 },
      { year: 2020, rate: 83, cases: 140 },
      { year: 2022, rate: 84, cases: 30 },
      { year: 2023, rate: 85, cases: 12 },
      { year: 2024, rate: 85, cases: 59 },
    ],
    lastUpdated: '2024-08-30',
    threat: {
      outbreakStatus: 'Near-eradication — wild poliovirus type 1 endemic in Afghanistan and Pakistan only',
      globalRisk: 'Low',
      regionalRisks: [
        { region: 'Afghanistan/Pakistan', level: 'High' },
        { region: 'Sub-Saharan Africa', level: 'Moderate' },
        { region: 'North America', level: 'Low' },
        { region: 'Europe', level: 'Low' },
        { region: 'Southeast Asia', level: 'Low' },
      ],
      herdImmunityThreshold: 85,
      currentCoverage: 85,
      alertLevel: 'PHEIC — Polio remains a Public Health Emergency of International Concern',
      alertSource: 'WHO GPEI',
    },
    timeline: [
      { year: 1789, event: 'First clinical description of poliomyelitis by Michael Underwood', type: 'discovery' },
      { year: 1916, event: 'Major US epidemic: 27,000 paralytic cases, 6,000 deaths', type: 'outbreak' },
      { year: 1952, event: 'Worst US polio year: 57,879 cases, 3,145 deaths, 21,269 paralyzed', type: 'outbreak' },
      { year: 1955, event: 'Jonas Salk\'s inactivated polio vaccine (IPV) licensed', type: 'vaccine' },
      { year: 1961, event: 'Albert Sabin\'s oral polio vaccine (OPV) licensed', type: 'vaccine' },
      { year: 1988, event: 'Global Polio Eradication Initiative launched — 350,000 cases/year', type: 'milestone' },
      { year: 1994, event: 'Americas declared polio-free', type: 'milestone' },
      { year: 2015, event: 'Wild poliovirus type 2 declared eradicated', type: 'milestone' },
      { year: 2019, event: 'Wild poliovirus type 3 declared eradicated', type: 'milestone' },
      { year: 2024, event: 'Only 59 wild poliovirus type 1 cases globally — eradication in sight', type: 'milestone' },
    ],
    preVaccine: { period: '1952 (peak US epidemic year)', cases: 57879, deaths: 3145 },
    postVaccine: { period: '2024 (global)', cases: 59, deaths: 0 },
    historicalContext: 'Polio terrorized the world for decades, paralyzing hundreds of thousands of children annually. The development of polio vaccines by Jonas Salk (1955) and Albert Sabin (1961) stands as one of humanity\'s greatest medical achievements. Global cases have been reduced by over 99.9% since 1988. Only Afghanistan and Pakistan still report wild poliovirus transmission. Full eradication — which would make polio the second human disease eliminated after smallpox — remains an active WHO priority.',
    pros: [
      { claim: 'Has reduced global polio cases by 99.9% since 1988', sourceType: 'Scientific consensus', detail: 'From 350,000 estimated annual cases to fewer than 100, polio vaccination is one of the most successful public health campaigns in history.' },
      { claim: 'IPV has an excellent safety profile with no risk of vaccine-derived polio', sourceType: 'Scientific consensus', detail: 'Unlike the oral vaccine, IPV uses killed virus and cannot revert to a disease-causing form.' },
      { claim: 'Near-complete eradication would be only the second disease eliminated after smallpox', sourceType: 'Scientific consensus', detail: 'Sustained vaccination has brought the world to the brink of eradicating wild poliovirus entirely.' },
    ],
    cons: [
      { claim: 'Oral polio vaccine (OPV) can rarely revert to virulent form, causing vaccine-derived polio', sourceType: 'Scientific consensus', detail: 'OPV (not IPV) uses live-attenuated virus that can mutate and cause outbreaks in under-vaccinated communities. This led most developed nations to switch to IPV. However, OPV remains essential for eradication in endemic regions due to its ability to induce mucosal immunity.' },
      { claim: 'IPV does not prevent intestinal infection or fecal-oral transmission as effectively as OPV', sourceType: 'Scientific consensus', detail: 'IPV primarily prevents paralytic disease but provides less mucosal immunity than OPV, meaning vaccinated individuals can still transmit the virus in areas with poor sanitation.' },
      { claim: 'Continued vaccination is questioned by some as case counts approach zero', sourceType: 'Individual rights argument', detail: 'Some argue that with fewer than 100 global cases, the cost and effort of universal vaccination may not be justified. Public health experts counter that stopping too early risks resurgence, as happened in Nigeria in 2003.' },
    ],
    sources: [
      { name: 'CDC Pink Book: Poliomyelitis Chapter', url: 'https://www.cdc.gov/vaccines/pubs/pinkbook/polio.html', description: 'Comprehensive reference on polio epidemiology, vaccine types, and recommendations.' },
      { name: 'Global Polio Eradication Initiative (GPEI)', url: 'https://polioeradication.org/', description: 'WHO-led initiative tracking global polio cases and eradication progress.' },
      { name: 'WHO Polio Fact Sheet', url: 'https://www.who.int/news-room/fact-sheets/detail/poliomyelitis', description: 'Overview of polio virology, transmission, vaccination, and global status.' },
    ],
  },

  'hpv': {
    id: 'hpv',
    name: 'HPV (Gardasil 9)',
    pathogen: 'Human Papillomavirus (types 6, 11, 16, 18, 31, 33, 45, 52, 58)',
    disease: 'HPV infection, cervical/anal/oropharyngeal cancers, genital warts',
    mechanism: 'Gardasil 9 is a recombinant subunit vaccine containing virus-like particles (VLPs) made from the major capsid protein (L1) of 9 HPV types. VLPs are non-infectious — they contain no viral DNA and cannot cause HPV infection. The immune system responds to VLPs by producing high levels of neutralizing antibodies that prevent future HPV infection at the mucosal surface.',
    mechanismType: 'Recombinant subunit (virus-like particles)',
    recommendedFor: [
      'All children at age 11-12 (can start at age 9)',
      'Catch-up vaccination through age 26',
      'Adults 27-45 (shared clinical decision-making)',
      'Both males and females',
      'Immunocompromised individuals (3-dose series)',
    ],
    ingredients: [
      { name: 'HPV L1 proteins (9 types)', role: 'Active ingredient — virus-like particles', safetyClassification: 'Active pharmaceutical ingredient', notes: 'Produced in yeast (S. cerevisiae); contain no viral DNA and are non-infectious' },
      { name: 'Amorphous aluminum hydroxyphosphate sulfate (AAHS)', role: 'Adjuvant — enhances immune response', safetyClassification: 'Long-established adjuvant', notes: '225 mcg aluminum per dose', scrutinized: true, scrutinizedExplainer: 'Aluminum-based adjuvants have been used in vaccines for over 70 years. The amount in a vaccine dose (0.225 mg) is far less than daily dietary aluminum intake (7-9 mg). Aluminum adjuvants remain at the injection site and are slowly eliminated. Some advocacy groups have raised concerns about aluminum accumulation, but pharmacokinetic studies show rapid clearance from the body.' },
      { name: 'Sodium chloride', role: 'Tonicity agent', safetyClassification: 'Generally recognized as safe', notes: 'Saline solution' },
      { name: 'L-histidine', role: 'Buffer', safetyClassification: 'Generally recognized as safe', notes: 'Essential amino acid naturally present in the body' },
      { name: 'Polysorbate 80', role: 'Surfactant — stabilizes formulation', safetyClassification: 'Generally recognized as safe', notes: 'Common food and pharmaceutical emulsifier' },
      { name: 'Sodium borate', role: 'Buffer — maintains pH', safetyClassification: 'Generally recognized as safe', notes: 'Present in trace amounts', scrutinized: true, scrutinizedExplainer: 'Sodium borate (borax) is toxic in large quantities but is present in Gardasil 9 at approximately 35 mcg per dose — a fraction of daily dietary boron intake. The amount is pharmacologically insignificant and serves only as a pH buffer.' },
      { name: 'Yeast protein', role: 'Residual from manufacturing', safetyClassification: 'Trace residual', notes: 'VLPs are produced in baker\'s yeast; <7 mcg protein per dose remains' },
    ],
    efficacy: [
      { metric: 'Prevention of HPV 16/18-related cervical precancers', rate: 97, confidenceInterval: [93, 99], source: 'Joura et al., NEJM 2015' },
      { metric: 'Prevention of infection with 9 targeted HPV types', rate: 96, confidenceInterval: [92, 98], source: 'FDA Gardasil 9 Prescribing Information' },
      { metric: 'Real-world cervical cancer reduction (vaccinated cohorts)', rate: 87, confidenceInterval: [72, 94], source: 'Lei et al., NEJM 2020 (Swedish registry study)' },
      { metric: 'Prevention of genital warts (HPV 6/11)', rate: 99, confidenceInterval: [96, 100], source: 'Giuliano et al., NEJM 2011' },
    ],
    adverseEvents: [
      { event: 'Injection site pain', frequency: '1 in 1.1', severity: 'Common', rate: '89.9%' },
      { event: 'Injection site swelling', frequency: '1 in 2.5', severity: 'Common', rate: '40%' },
      { event: 'Headache', frequency: '1 in 6.5', severity: 'Common', rate: '15.4%' },
      { event: 'Fever', frequency: '1 in 9', severity: 'Common', rate: '11.4%' },
      { event: 'Nausea', frequency: '1 in 16', severity: 'Uncommon', rate: '6.3%' },
      { event: 'Syncope (fainting)', frequency: '1 in 1,000', severity: 'Uncommon', rate: '0.1%' },
      { event: 'Serious allergic reaction', frequency: '1 in 1,000,000', severity: 'Very Rare', rate: '0.0001%' },
    ],
    vaccinationRates: [
      { year: 2011, rate: 35, cases: 79000 },
      { year: 2013, rate: 38, cases: 79000 },
      { year: 2015, rate: 42, cases: 78000 },
      { year: 2017, rate: 49, cases: 76000 },
      { year: 2019, rate: 54, cases: 72000 },
      { year: 2020, rate: 52, cases: 70000 },
      { year: 2021, rate: 59, cases: 66000 },
      { year: 2022, rate: 62, cases: 62000 },
      { year: 2023, rate: 64, cases: 58000 },
      { year: 2024, rate: 66, cases: 55000 },
    ],
    lastUpdated: '2024-10-15',
    threat: {
      outbreakStatus: 'HPV is not an "outbreak" disease — it is a persistent sexually transmitted infection affecting ~80% of sexually active individuals',
      globalRisk: 'High',
      regionalRisks: [
        { region: 'Sub-Saharan Africa', level: 'Critical' },
        { region: 'Southeast Asia', level: 'High' },
        { region: 'South America', level: 'Moderate' },
        { region: 'North America', level: 'Moderate' },
        { region: 'Europe', level: 'Moderate' },
      ],
      herdImmunityThreshold: 80,
      currentCoverage: 66,
      alertLevel: 'WHO Global Strategy: Eliminate Cervical Cancer by 2030',
      alertSource: 'WHO',
    },
    timeline: [
      { year: 1842, event: 'Rigoni-Stern observes cervical cancer is rare in nuns, suggesting sexual transmission', type: 'discovery' },
      { year: 1976, event: 'Harald zur Hausen proposes HPV causes cervical cancer (Nobel Prize 2008)', type: 'discovery' },
      { year: 1983, event: 'HPV-16 DNA isolated from cervical cancer tissue', type: 'discovery' },
      { year: 1991, event: 'Virus-like particles (VLPs) successfully produced, enabling vaccine development', type: 'milestone' },
      { year: 2006, event: 'Gardasil (quadrivalent HPV vaccine) licensed — first cancer-prevention vaccine', type: 'vaccine' },
      { year: 2014, event: 'Gardasil 9 approved, covering 9 HPV types responsible for ~90% of HPV cancers', type: 'vaccine' },
      { year: 2020, event: 'WHO launches global strategy to eliminate cervical cancer', type: 'milestone' },
      { year: 2021, event: 'Swedish study shows 87% reduction in cervical cancer in women vaccinated before age 17', type: 'milestone' },
    ],
    preVaccine: { period: '2006 (US, pre-vaccine era)', cases: 79000, deaths: 4200 },
    postVaccine: { period: '2024 (US, projected)', cases: 55000, deaths: 2800 },
    historicalContext: 'HPV is the most common sexually transmitted infection globally. Virtually all cervical cancers — the fourth most common cancer in women — are caused by HPV. The development of the HPV vaccine represented a groundbreaking achievement: the world\'s first vaccine designed to prevent cancer. In countries with high vaccination rates, dramatic reductions in HPV infections, precancerous lesions, and now cancer itself have been documented. The WHO aims to eliminate cervical cancer as a public health problem by 2030.',
    pros: [
      { claim: 'First vaccine proven to prevent cancer — 87% reduction in cervical cancer in vaccinated cohorts', sourceType: 'Scientific consensus', detail: 'Large-scale Swedish registry study (Lei et al., NEJM 2020) showed dramatic cancer reduction in women vaccinated before age 17.' },
      { claim: 'Prevents ~90% of HPV-related cancers across multiple sites (cervical, anal, oropharyngeal)', sourceType: 'Scientific consensus', detail: 'The 9 HPV types covered by Gardasil 9 are responsible for approximately 90% of HPV-attributable cancers globally.' },
      { claim: 'Benefits extend to males — prevents genital warts, anal cancer, and oropharyngeal cancer', sourceType: 'Scientific consensus', detail: 'HPV-related cancers in men, particularly oropharyngeal cancer, have been rising. Male vaccination provides direct protection and reduces community transmission.' },
      { claim: 'No serious safety signals after 300+ million doses administered globally', sourceType: 'Scientific consensus', detail: 'The WHO Global Advisory Committee on Vaccine Safety has repeatedly reaffirmed the HPV vaccine\'s safety profile.' },
    ],
    cons: [
      { claim: 'Concerns about informed consent when vaccinating pre-adolescents for an STI', sourceType: 'Individual rights argument', detail: 'Some parents object to vaccinating 11-12 year olds against a sexually transmitted infection, viewing it as premature or conflicting with their values around sexual health education.' },
      { claim: 'Aluminum adjuvant load is higher than many childhood vaccines', sourceType: 'Contested claim', detail: 'Gardasil 9 contains 500 mcg AAHS per dose. Some advocacy groups argue this is concerning, though the amount remains well within WHO safety limits and is less than typical daily dietary aluminum intake.' },
      { claim: 'Reports of chronic pain syndromes post-vaccination remain under investigation', sourceType: 'Emerging research', detail: 'Clusters of chronic fatigue and pain syndromes reported post-HPV vaccination (notably in Denmark and Japan) led to further investigation. Large epidemiological studies have not found a causal link, but research continues and the reports led Japan to temporarily suspend its recommendation (later reinstated in 2022).' },
      { claim: 'Does not eliminate need for cervical screening, potentially creating false sense of security', sourceType: 'Scientific consensus', detail: 'The vaccine does not cover all HPV types. Continued Pap smear/HPV testing is essential even for vaccinated individuals, but some worry that vaccination may reduce screening compliance.' },
    ],
    sources: [
      { name: 'Lei J, et al. "HPV Vaccination and the Risk of Invasive Cervical Cancer"', url: 'https://www.nejm.org/doi/full/10.1056/NEJMoa1917338', description: 'Landmark Swedish study demonstrating 87% cervical cancer reduction in women vaccinated before age 17.' },
      { name: 'FDA Gardasil 9 Prescribing Information', url: 'https://www.fda.gov/vaccines-blood-biologics/vaccines/gardasil-9', description: 'Complete clinical data, ingredients, efficacy, and safety information for Gardasil 9.' },
      { name: 'WHO: Global Strategy to Eliminate Cervical Cancer', url: 'https://www.who.int/initiatives/cervical-cancer-elimination-initiative', description: 'WHO\'s global strategy targeting 90% HPV vaccination coverage, 70% screening coverage, and 90% treatment access by 2030.' },
    ],
  },
};

export const vaccineKeys = Object.keys(vaccines) as Array<keyof typeof vaccines>;
export const vaccineOptions = vaccineKeys.map(key => ({
  value: key,
  label: vaccines[key].name,
}));
