export const branchConstants = {
  langz: {
    eng: {
      dir: "ltr",
      branch: {
        title: "Consortium Company",
        header: {
          h1: "Organization Information",
          h2: "Complete Information",
          h3: "Password",
        },
        c1: {
          title: "Organization Information",
          in1: "TIN",
          in2: "Company ID",
          in3: "Company Name",
          in4: "Contract Number",
          in5: "Reporting Branch",
          reportingBranch: "LTA (Large Taxpayer Administration)"
        },
        c2: {
          title: "Contact Information",
          in1: "Mobile Number",
          in2: "Email",
          in3: "Confirm Email"
        },
        c3: {
          title: "Branches Details",
          columns: {
            c1: "Branch Name",
            c2: "CR/License Number",
            c3: "Branch City",
            c4: "Type"
          },
          addbtn: "Add New Branch",
          // in1: "ID Number",
          // in2: "Date of Birth",
          // in3: "Name",
          // in4: "Mobile Number",
          // in5: "Email",
          // in6: "Confirm Email",
          // in7: "Other Attachment",
          btn: "continue",
        },
        c4: {
          title: "Shareholders Details",
          columns: {
            c1: "Name",
            c2: "ID Type",
            c3: "ID Number",
            c4: "Capital Percentage",
            c5: "Benefit Percentage"
          },
          addbtn: "Add New shareholders",
        },
        c5: {
          title: "Financial Details",
          in1: "Account Method",
          in2: "TIN in your country",
          in3: "TAN in your country",
          in4: "Capital Registration Date",
          in5: "Capital Amount(SAR)",
          in6: "End of Financial",
          in7: "Day",
          in8: "Month",
          in9: "Business Commencement Date",
          in10: "Taxable Date",
          label1: "Calendar Type to select the End of financial year ?",
          label2: "Hijri",
          label3: "Gregorian",
        },
        err: {
          in1: "is Required",
          in2: "should be atleast 10 characters long",
          // in3: "can be atmax 10 characters long!",
          // in4: "must be Numeric",
          // in5: "is Invalid",
          in6: "Email and Confirm Email should be same",
          // in7: "should start with 7",
          in8: "should start with 3",
          in9: "should start with 1",
          in10: "should start with 2",
          in11: "should be between 7-15 digits",
          in12: "should be 10 digits",
          // in13: "should start with 5",
          // in14: "should be atleast 9 characters long",
          invalidcompanyID: "",
          enterCompanyName: "Enter Company Name",
          containsOnlyNumbers: "Only numbers not allowed for Company name",
          containsSpecialChars: "Special characters are not allowed in Company Name",
          enterEmail: "Enter Email ID",
          enterConfirmEmail: "Enter Email ID",
          emailinvalid: "Invalid Email address",
          emailsNotMatch: "Email and Confirm Email should be same",
          companyidlength: "Company ID should be 10 digit",
          companyidstartwitherr: "Company ID should start with 7",
          mobilenumbererr: "Mobile Number should start with 5",
          // maxLimit: "Maximum limit to attach files reached",
          branchNamerequired: "Enter Branch Name",
          copyofmemorequired: "Please attach copy of Company Memorandum for Outlet Number ",
          mgarqrd: "Please select Main Group",
          sgarqrd: "Please select Sub Group",
          marqrd: "Please choose main activity",
          ma2rqrd:"Please select Activity",          
          countryrqrd: "Select Country",
          provincerqrd: "Select Province",
          cityrqrd: "Select City",
          quarterrqrd: "Enter Quarter",
          enterDistrict:"Enter District",
          streetrqrd: "Enter Street",
          bnorqrd: "Enter Building number",
          ziprqrd: "Enter Postal Code",
          unorqrd: "Enter Unit Number",
          companyTinErr: "Contact person should be an Individual and not a company",
          enterCRNumber: "Enter CR number",
          invalidCR: "Invalid CR Number",
          enterValidFromDate: "Enter Valid From Date",
          enterLicenseNumber: "Enter License Number",
          enterContractNumber: "Enter contract number",
          selectIssueBy: "Please Select Issue By",
          selectIssueCountry: "Please select Issue country",
          selectIssueCity: "Please select City",
          copyOfCRRequired: "Please add attachment",
          copyOfLicenseRequired: "Please add attachment",
          copyOfContractRequired: "Please add attachment",
          copyOfGMIDRequired: "Please add attachment",
          addAttachment: "Please add attachment",
          fileSizeError: "File size should be less than 5 MB",
          fileTypeError: "Choose only file with extension DOC, DOCX, XLS, XLSX, PDF, JPG",
          nationalIDStartWith: "ID number should start with 1",
          nationalIDMinLength: "National ID should be 10 digits",
          iqamaIDStartWith: "Iqama ID should start with 2",
          iqamaIDMinLength: "Iqama ID should be 10 digits",
          gccIDMinlength: "GCC ID should be between 7-15 digits",
          enterDateOfBirth: "Enter Date of Birth",
          enterShDateOfBirth: "Enter Birth Date",
          enterStartDate: "Enter Start Date",
          enterNationalID: "Enter National ID",
          enterIqamaID: "Enter Iqama ID",
          enterGccID: "Enter GCC ID",
          enterIssueCountryPassport: "Please select issue country",
          enterPassportNumber: "Please enter passport number",
          tinNumberMinlength: "Tin Number should be atleast 10 characters long",
          tinNumberStartWith: "Tin Number should start with 3",
          selectIDType: "Select ID Type",
          enterFirstName: "Enter First Name",
          enterLastName: "Enter Last Name",
          enterMobileNumber: "Enter Mobile Number",
          startsWithZero: "Mobile Number should not start with 0",
          bcpMobileNumberStartWith: "Mobile Number should be start with 009665",
          bcpMobileNumberMaxLength: "Mobile Number should be 14 digits",
          enterIDNumber: "Enter ID Number",
          dobFutureDate: "Entered Date cannot be future date",
          startDateFutureDate: "Entered Date cannot be future date",
          scstdtfutureDate: "Entered Date cannot be future date",
          spstdtfutureDate: "Entered Date cannot be future date",
          validFromFutureDate: "Entered Date cannot be future date",
          copyOfPassport: "Copy Of General Manger ID",
          copyOfText: "Copy of ",
          tinInYourCountryAlert: "If you are GCC resident please select GCC ID. Selecting Tin in your country will make shareholder liable for income tax",
          enterCapitalPercentage: "Enter Valid Percentage",
          enterProfitPercentage: "Enter Valid Percentage",
          enterSaudiShare: "Enter Correct Percentage",
          enterforeignShare: "Enter Correct Percentage",
          enterAdditionalNumber: "Enter Additional number",
          selectMainActivity:"Please select main activity"
        },
        c6: {
          title: "New Branch Details",
          s1: "Branch Details",
          in1: "Branch Name",
          in2: "Copy of Company Memorandum"
        },
        c7: {
          title: "Activity Details",
          label1: "Type of identification",
          label2: "Add Commercial Number ",
          label3: "Add Licenses Number ",
          label4: "Add Contract Details",
          // hint1: "You can add multiple licenses numbers (maximum 4), and select only one main license that is linked to the main activity for this branch",
          hint2: "You can add multiple licenses numbers (maximum 4), and select only one main license that is linked to the main activity for this branch",
          // hint3: "You can add multiple licenses numbers (maximum 4), and select only one main license that is linked to the main activity for this branch",
          idtypeLabel1: "Commercial Number Details",
          idtypeLabel2: "License Details",
          idtypeLabel3: "Contract Details",
          in1: "Main Activity",
          in2: "Issue Country",
          in3: "Issue By ",
          in4: "Issued City",
          in5: "License Number",
          in6: "Valid From ",
          in7: "Copy Of License",
          in8: "Copy Of CR",
          in9: "Copy Of Contract",
          in10: "Main Group of Activity",
          in11: "Sub Group Of Activity",
          in12: "Main Activity",
          in13: "Transfer copy of CR",
          btn: "Add New Commercial Number",
          btn2: "Add New License",
          btn3: "Add New Contract",
          in14: "CR Number",
          in15: "Contract Number"
        },
        c8: {
          title: "Address Details",
          in1: "Country",
          in2: "Province",
          in3: "City",
          in4: "District",
          in5: "Street Name",
          in6: "Building Number",
          in7: "Zip Code",
          in8: "Additional Number",
          in9: "Unit Number",
          selectAddress:"Please select any one National address"
        },
        c9: {
          title: "Contact Person",
          in1: "Tin",
          in2: "ID Type",
          in3: "ID Number",
          in4: "Issue Country",
          in5: "Date of Birth",
          in6: "First Name",
          in7: "Last Name",
          in8: "Start Date",
          in9: "Mobile Number",
          in10: "Email",
          in11: "Confirm Email",
          in12: "Copy Of General Manger ID",

        },

        c10: {
          header: "New Shareholder Details",
          s1: "",
          title: "Shareholder Percentage Details",
          in1: "Share Capital",
          in2: "Start Date of sharing Capital",
          in3: "Share Profit",
          in4: "Start Date of sharing Profit",
        },
        c11: {
          title: "Shareholder Details",
          subtitle: "Type of Share Percentage of a capital company",
          in1: "Shareholder Type",
          in2: "TIN",
          in3: "ID Type",
          in4: "ID Number",
          in5: "Company Name",
          in6: "Start Date",
          in7: "End Date",
          in8: "SaudiGCC Share",
          in9: "Foreign Share ",
          in10: "Copy Of Commercial Number",
          // rd1: "Established in KSA with 100% Saudi capital",
          // rd2: "Established in KSA with 100% non Saudi capital",
          // rd3: "Established in KSA with mixed capital",
          // rd4: "Established in one of the gulf countries",
          // rd5: "Established in other countries",
          spsharelbl: "Saudi Partner Share",
          fpsharelbl: "Foreign Partner Share",
          cslbl: "Capital Share",
          pslbl: "Profit Share",
        },
        c12: {
          title: "Communications details",
          in1: "Mobile.",
          in2: "Email",
          btn1: "Save",
          btn2: "Cancel",
        },
        c13: {
          in1: "Saudi Partner Share:",
          in2: "Foreign Partner Share:",
          in3: "Capital Share:",
          in4: "Profit Share: ",
          btn1: "Save",
          btn2: "Cancel",
        },
        back: "Back",
        continue: "Continue",
        yes: "YES",
        no: "NO",
        ok: "OK",
        confirm: "Confirmation",
        cancel: "Cancel",
        error: "Error",
        mainBrString: "MAIN",
        subBrString: "SUB",
        acknowledgement: {
          title: "Acknowledgement",
          message: "GAZT acknowledges the receipt of your registration application",
          info: {
            name: "Name",
            appno: "Application Number",
            date: "Date",
            login_link_label: "Go To Login"
          }
        },
        accounting: "Accounting method",
        estimated: "Estimated method",
        deleteBranch: {
          yes: "YES",
          no: "NO",
          ok: "OK",
          cannotDelete: "Main outlet cannot be deleted"
        },
        attachments: {
          title: "Attachments",
          label1: "Drag and drop file to upload documentation",
          label2: "File size should be less than 10 MB.",
          txt1: "1. The maximum number of attachments that can be uploaded is 5",
          txt2: "2. Alert, you must adjust the settings of the scanner so that the zip file size is less than 10MB",
          txt3: "3. The recommended settings for your scanner is : 1024 * 745",
          txt4: "4. Choose only file with extension DOC, DOCX, XLS, XLSX, PDF, JPG",
          txt5: "5. Please make sure that the attached file is free of any viruses or hacking programs as any file containing this type of file will be rejected automatically.",
        },
        days: [
          { key: '01', value: '01' }, { key: '02', value: '02' }, { key: '03', value: '03' }, { key: '04', value: '04' }, { key: '05', value: '05' },
          { key: '06', value: '06' }, { key: '07', value: '07' }, { key: '08', value: '08' }, { key: '09', value: '09' }, { key: '10', value: '10' },
          { key: '11', value: '11' }, { key: '12', value: '12' }, { key: '13', value: '13' }, { key: '14', value: '14' }, { key: '15', value: '15' },
          { key: '16', value: '16' }, { key: '17', value: '17' }, { key: '18', value: '18' }, { key: '19', value: '19' }, { key: '20', value: '20' },
          { key: '21', value: '21' }, { key: '22', value: '22' }, { key: '23', value: '23' }, { key: '24', value: '24' }, { key: '25', value: '25' },
          { key: '26', value: '26' }, { key: '27', value: '27' }, { key: '28', value: '28' }, { key: '29', value: '29' }, { key: '30', value: '30' },
          { key: 'LD', value: 'Last Day' }
        ],
        months: [
          { key: '01', value: '1' }, { key: '02', value: '2' }, { key: '03', value: '3' }, { key: '04', value: '4' }, { key: '05', value: '5' },
          { key: '06', value: '6' }, { key: '07', value: '7' }, { key: '08', value: '8' }, { key: '09', value: '9' }, { key: '10', value: '10' },
          { key: '11', value: '11' }, { key: '12', value: '12' }
        ],
        sharePercentageTypes: [{ "label": "Established in KSA with 100% Saudi Capital", "id": "RS" },
        { "label": "Established in KSA with 100% non- saudi capital", "id": "RF" },
        { "label": "Established in KSA with mixed capital", "id": "RM" },
        { "label": "Established in one of the gulf countries", "id": "RG" },
        { "label": "Established in other countries", "id": "RO" }
        ]
      },
      issueByList: [
        {
          key: "90701",
          text: 'Communications and Information Technology Commission',
        },
        {
          key: "90702",
          text: 'Ministry of Commerce',
        },
        {
          key: "90703",
          text: 'Ministry of Health',
        },
        {
          key: "90704", text: 'Ministry of Media',
        },
        {
          key: "90705", text: 'Ministry of Environment Water & Agriculture',
        },
        {
          key: "90706", text: 'Ministry of Municipal and Rural Affairs',
        },
        {
          key: "90707", text: 'Ministry of Education',
        },
        {
          key: "90708", text: 'Technical and Vocational Training Corporation',
        },
        {
          key: "90709", text: 'Ministry of Human Resources and Social Development',
        },
        {
          key: "90710", text: 'Ministry of Islamic Affairs Dawah and Guidance',
        },
        {
          key: "90711", text: 'Ministry of Hajj and Umrah',
        },
        {
          key: "90712", text: 'Ministry of Investment',
        },
        {
          key: "90713", text: 'Saudi Electricity Company',
        },
        {
          key: "90714", text: 'Saudi Arabian Monetary Agency',
        },
        {
          key: "90715", text: 'General Authority of Civil Aviation',
        },
        {
          key: "90716", text: 'Ministry of Interior',
        },
        {
          key: "90717", text: 'Ministry of Transportation',
        },
        {
          key: "90719", text: 'Same Government Agency',
        },
        {
          key: "90721", text: 'Municipality',
        },
        {
          key: "90722", text: 'Saudi Organization for Certified public Accountants',
        },
        {
          key: "90723", text: 'Ministry of Tourism',
        },
        {
          key: "90725", text: 'Ministry Of Justice',
        },
        {
          key: "90729", text: 'Saudi Council of Engineers',
        },
        {
          key: "90724", text: 'Ministry of Industry and Mineral Resources',
        },
        {
          key: "90740", text: 'Ministry of Sports',
        },
        {
          key: "90731", text: 'Saudi Wildlife Authority',
        },
        {
          key: "90732", text: 'Saudi Authority for Industrial Cities and Technology Zones',
        },
        {
          key: "90733", text: 'The General Authority of Meteorology and Environmental Protection',
        },
        {
          key: "90735", text: 'Saudi Food and Drug Authority'
        },
        {
          key: "90736", text: 'Saudi Ports Authority',
        },
        {
          key: "90737", text: 'Capital Markets Authority',
        },
        {
          key: "90738", text: 'Electricity & CoGeneration Regulatory Authority',
        },
        {
          key: "90739", text: 'Ministry of Housing',
        },
        {
          key: "90741", text: 'Ministry of Energy',
        },
        {
          key: "90718", text: 'Other',
        }

      ],
      idTypes: [
        {
          name: "National ID",
          value: "ZS0001",
        },
        { name: "Iqama ID", value: "ZS0002" },
        { name: "GCC ID", value: "ZS0003" },
        { name: "Passport", value: "FS0002" },
      ],

    },
    arb: {
      dir: "rtl",
      branch: {
        title: "شركة متحده",
        header: {
          h1: "معلومات المنظمة",
          h2: "إكمال البيانات",
          h3: "كلمة المرور",
        },
        c1: {
          title: "معلومات المنظمة",
          in1: "الرقم المميز",
          in2: "رقم هوية الشركة",
          in3: "اسم الشركة",
          in4: "رقم العقد",
          in5: "فرع الهيئة الرئيسي",
          reportingBranch: "إدارة كبار المكلفين "
        },
        c2: {
          title: "معلومات الإتصال",
          in1: "رقم الجوال",
          in2: "البريد الإلكتروني",
          in3: "تأكيد البريد الإلكتروني"
        },
        c3: {
          title: "فروع المنشأة",
          columns: {
            c1: "اسم الفرع",
            c2: "رقم السجل التجاري/ الرخصة",
            c3: "المدينة",
            c4: "النوع"
          },
          addbtn: "إضافة فرع جديد",
          // in1: "ID Number",
          // in2: "Date of Birth",
          // in3: "Name",
          // in4: "Mobile Number",
          // in5: "Email",
          // in6: "Confirm Email",
          // in7: "Other Attachment",
          btn: "متابعة",
        },
        c4: {
          title: "تفاصيل الشركاء",
          columns: {
            c1: "الاسم",
            c2: "نوع الهوية",
            c3: "رقم الهوية",
            c4: "نسبة رأس المال",
            c5: "نسبة الفائدة"
          },
          addbtn: "إضافة شريك جديد",
        },
        c5: {
          title: "التفاصيل المالية",
          in1: "طريقة المحاسبة",
          in2: "الرقم المميز في بلدك",
          in3: "رقم الحساب الضريبي في بلدك",
          in4: "تاريخ تسجيل رأس المال",
          in5: "مبلغ رأس المال (ر.س)",
          in6: "نهاية السنة المالية",
          in7: "يوم",
          in8: "شهر",
          in9: "تاريخ بدء الأعمال",
          in10: "تاريخ الخضوع للضريبة",
          label1: "الرجاء اختيار نوع التقويم لتحديد نهاية السنة المالية؟ ",
          label2: "هجري",
          label3: "ميلادي",
        },
        err: {
          in1: "مطلوب",
          in2: "should be atleast 10 characters long",
          // in3: "can be atmax 10 characters long!",
          // in4: "must be Numeric",
          // in5: "is Invalid",
          in6: "البريد الإلكتروني المدخل غير مطابق, الرجاء ادخال بريد صحيح",
          // in7: "should start with 7",
          in8: "should start with 3",
          in9: "should start with 1",
          in10: "should start with 2",
          in11: "should be between 7-15 digits",
          in12: "should be 10 digits",
          // in13: "should start with 5",
          // in14: "should be atleast 9 characters long",
          invalidcompanyID: " رقم الشركة يجب أن يتكون من 10 أرقام",
          enterCompanyName: "الرجاء ادخال اسم الشركة",
          containsOnlyNumbers: "اسم الشركة يجب أن يحتوي على أحرف فقط",
          containsSpecialChars: "اسم الشركة يجب أن لايحتوي على رموز",
          enterEmail: "الرجاء ادخال البريد الإلكتروني",
          enterConfirmEmail: "الرجاء ادخال البريد الإلكتروني",
          emailinvalid: "الرجاء إدخال بريد إلكتروني صحيح",
          emailsNotMatch: "البريد الإلكتروني المدخل غير مطابق, الرجاء ادخال بريد صحيح",
          companyidlength: "رقم الشركة يجب أن يتكون من 10 أرقام",
          companyidstartwitherr: "رقم الشركة يجب ان يبدا بـرقم 7",
          mobilenumbererr: "يجب أن يبدأ رقم الهاتف المحمول بالرقم خمسة",
          // maxLimit: "Maximum limit to attach files reached",
          branchNamerequired: "ادخل اسم الفرع",
          copyofmemorequired: "الرجاء إرفاق نسخة من عقد تأسيس المنشأة للفرع رقم ",
          mgarqrd: "الرجاء اختيار المجموعة الرئيسية",
          sgarqrd: "الرجاء اختيار المجموعة الفرعية",
          marqrd: "الرجاء اختيار النشاط الرئيسي",
          ma2rqrd: "الرجاء اختيار النشاط الرئيسي",
          countryrqrd: "اختر الدولة",
          provincerqrd: "اختر المنطقة",
          cityrqrd: "اختر المدينة",
          quarterrqrd: "ادخل الحي",
          enterDistrict:"ادخل الحي",
          streetrqrd: "ادخل اسم الشارع",
          bnorqrd: "ادخل رقم المبنى",
          ziprqrd: "ادخل الرمز البريدي",
          unorqrd: "الرجاء إدخال رقم الوحدة",
          companyTinErr: "شخص الاتصال يجب ان يكون فرد وليس شركة",
          enterCRNumber: "الرجاء ادخال رقم السجل التجاري",
          invalidCR: "رقم سجل تجاري غير صحيح",
          enterValidFromDate: "ادخل تاريخ بدء صحيح",
          enterLicenseNumber: "ادخل رقم الرخصة",
          // enterContractNumber: "ادخل رقم الرخصة",
          enterContractNumber: "الرجاء ادخال رقم العقد",
          selectIssueBy: "الرجاء اختيار جهة الإصدار",
          selectIssueCountry: "الرجاء اختيار دولة الإصدار",
          selectIssueCity: "الرجاء اختيار المدينة",
          // copyOfCRRequired: "من فضلك ارفق نسخة من السجل التجاري للفرع الرئيسي/الفرعي ذا علاقة بالترخيص",
          copyOfCRRequired: "الرجاء رفع المرفقات",
          copyOfLicenseRequired: "الرجاء رفع المرفقات",
          copyOfContractRequired: "الرجاء رفع المرفقات",
          copyOfGMIDRequired: "الرجاء رفع المرفقات",
          addAttachment: "الرجاء رفع المرفقات",
          fileSizeError: "يجب ان يكون حجم الملف المرفق اقل من 5 ميجا",
          fileTypeError: "الرجاء إختيار ملف من الإمتدادات التالية فقط DOC, DOCX, XLS, XLSX, PDF, JPG",
          nationalIDStartWith: "رقم الهوية الوطنية يجب أن يبدأ برقم 1",
          nationalIDMinLength: "رقم الهوية الوطنية يجب ان يتكون من 10 أرقام",
          iqamaIDStartWith:  "رقم الهوية يجب ان يبدأ بـ 2",
          iqamaIDMinLength: "رقم الإقامة يجب أن يتكون من 10 أرقام",
          gccIDMinlength: "رقم مواطني دول الخليج يجب ان يتكون من 7 الى 15 رقم",
          enterDateOfBirth: "الرجاء إدخال تاريخ الميلاد",
          enterStartDate: "ادخل تاريخ البدء",
          enterNationalID: "Enter National ID",
          enterIqamaID: "Enter Iqama ID",
          enterGccID: "Enter GCC ID",
          enterIssueCountryPassport: "الرجاء اختيار دولة الإصدار",
          enterPassportNumber: "الرجاء إدخال رقم الجواز",
          tinNumberMinlength: "الرقم المميز يجب ان يحتوي على 10 ارقام",
          tinNumberStartWith: "الرقم المميز يجب ان يبدأ برقم 3",
          selectIDType: "Select ID Type",
          enterFirstName: "الرجاء إدخال الاسم الأول",
          enterLastName: "الرجاء إدخال اسم العائلة",
          enterMobileNumber: "الرجاء ادخال رقم الجوال",
          startsWithZero: "رقم الهاتف المحمول يجب أن لا يبدأ بصفر",
          bcpMobileNumberStartWith: "يجب ان يبدأ رقم الهاتف الجوال بـ 009665",
          bcpMobileNumberMaxLength: "رقم الجوال خاطئ يجب أن يتكون من 14 رقم",
          enterIDNumber: "ادخل رقم الهوية",
          dobFutureDate: "التاريخ المدخل يجب ان يكون قبل من تاريخ اليوم",
          // "تاريخ الميلاد المدخل يجب ان يكون اقدم من تاريخ الحالي",
          startDateFutureDate: "التاريخ المدخل يجب ان يكون قبل من تاريخ اليوم",
          scstdtfutureDate: "التاريخ المدخل يجب ان يكون قبل من تاريخ اليوم",
          spstdtfutureDate: "التاريخ المدخل يجب ان يكون قبل من تاريخ اليوم",
          validFromFutureDate: "التاريخ المدخل يجب ان يكون قبل من تاريخ اليوم",
          copyOfPassport: "نسخة من جواز السفر",
          copyOfText: " نسخة من ",
          tinInYourCountryAlert: "اذا كنت خليجي الرجاء اختر نوع هوية المواطن الخليجي, اذا تم اختيار الرقم الضريبي في البلد الام فسيتم محاسبتك ضريباً وليس زكوياً",
          enterCapitalPercentage: "ادخل نسبة صحيحة",
          enterProfitPercentage: "ادخل نسبة صحيحة",
          enterSaudiShare: "ادخل نسبة صحيحة",
          enterforeignShare: "ادخل نسبة صحيحة",
          enterAdditionalNumber: "ادخل الرقم الإضافي",
          selectMainActivity:"الرجاء اختيار النشاط الرئيسي"
        },
        c6: {
          title: "تفاصيل الفرع الجديد",
          s1: "تفاصيل الفرع",
          in1: "اسم الفرع",
          in2: "نسخة من مذكرة الشركة"
        },
        c7: {
          title: "تفاصيل النشاط",
          label1: "نوع الهوية",
          label2: "إضافة سجل تجاري",
          label3: "إضافة رخصة تجارية",
          label4: "إضافة تفاصيل عقد",
          // hint1: "You can add multiple licenses numbers (maximum 4), and select only one main license that is linked to the main activity for this branch",
          hint2: "يمكنك إضافة عدة رخص تجارية (بحد أقصى 4) ، واختيار رخصة تجارية واحده فقط كرئيسية مرتبط بالنشاط الرئيسي لهذا الفرع",
          // hint3: "You can add multiple licenses numbers (maximum 4), and select only one main license that is linked to the main activity for this branch",
          idtypeLabel1: "تفاصيل السجل التجاري",
          idtypeLabel2: "تفاصيل الرخصة التجارية ",
          idtypeLabel3: "تفاصيل العقد",
          in1: "نشاط رئيسي",
          in2: "دولة الإصدار",
          in3: "جهة الإصدار",
          in4: "مدينة الإصدار",
          in5: "رقم الرخصة",
          in6: "صالح من تاريخ",
          in7: "نسخة من الرخصة",
          in8: "نسخة من السجل التجاري",
          in9: "نسخة من العقد",
          in10: "المجموعة الرئيسية للنشاط",
          in11: "المجموعة الفرعية للنشاط",
          in12: "النشاط الرئيسي",
          in13: "نسخة تحويل السجل التجاري",
          btn: "Add New Commercial Number",
          btn2: "إضافة رخصة جديده",
          btn3: "Add New Contract",
          in14: "رقم السجل التجاري",
          in15: "رقم العقد"
        },
        c8: {
          title: "تفاصيل العنوان",
          in1: "الدولة",
          in2: "المنطقة",
          in3: "المدينة",
          in4: "الحي",
          in5: "اسم الشارع",
          in6: "رقم المبنى",
          in7: "الرمز البريدي ",
          in8: "الرقم الإضافي",
          in9: "رقم الوحده",
          selectAddress:"الرجاء اختيار العنوان الوطني"
        },
        c9: {
          title: "الشخص الذي يمكن الاتصال به",
          in1: "الرقم المميز",
          in2: "نوع الهوية",
          in3: "رقم الهوية",
          in4: "دولة الإصدار",
          in5: "تاريخ الميلاد",
          in6: "الاسم الاول",
          in7: "اسم العائلة",
          in8: "تاريخ البدء",
          in9: "رقم الجوال",
          in10: "البريد الإلكتروني",
          in11: "تأكيد البريد الإلكتروني",
          in12: "نسخة من الهوية"

        },

        c10: {
          header: "تفاصيل المساهم الجديد",
          s1: "",
          title: "تفاصيل نسبة المساهمين",
          in1: "شراكة رأس المال",
          in2: "تاريخ بداية شراكة رأس المال",
          in3: "نسبة الربح",
          in4: "تاريخ بداية مشاركة الربح",
        },
        c11: {
          title: "تفاصيل المساهمين",
          subtitle: "نوع الحصة نسبة شركة الأموال ",
          in1: "نوع المساهم",
          in2: "الرقم المميز",
          in3: "نوع الهوية",
          in4: "رقم الهوية",
          in5: "اسم الشركة",
          in6: "تاريخ البداية",
          in7: "End Date",
          in8: "نسبة شراكة السعودي/ دول الخليج",
          in9: "نسبة شراكة الأجنبي",
          in10: "نسخة من السجل التجاري",
          // rd1: "Established in KSA with 100% Saudi capital",
          // rd2: "Established in KSA with 100% non Saudi capital",
          // rd3: "Established in KSA with mixed capital",
          // rd4: "Established in one of the gulf countries",
          // rd5: "Established in other countries",
          spsharelbl: "نسبة الشركاء السعوديين",
          fpsharelbl: "نسبة الشركاء الغير سعوديين",
          cslbl: "نسبة رأس المال",
          pslbl: "نسبة الفائدة"
        },
        c12: {
          title: "تفاصيل الإتصال",
          in1: "رقم الجوال",
          in2: "البريد الإلكتروني",
          btn1: "حفظ",
          btn2: "إلغاء",
        },
        c13: {
          in1: ": نسبة الشركاء السعوديين",
          in2: ": نسبة الشركاء الغير سعوديين",
          in3: ":نسبة رأس المال:",
          in4: ": نسبة الفائدة ",
          btn1: "حفظ",
          btn2: "إلغاء",
        },
        back: "رجوع",
        continue: "متابعة",
        yes: "نعم",
        no: "لا",
        ok: "موافق",
        confirm: "تأكيد",
        cancel: "إلغاء",
        error: "خطأ",
        mainBrString: "أساسي",
        subBrString: "فرعي",
        acknowledgement: {
          title: "إشعار إستلام",
          message: "تقر الهيئة العامة للزكاة والدخل باستلام طلب التسجيل الخاص بك",
          info: {
            name: "الاسم",
            appno: "رقم الطلب",
            date: "التاريخ",
            login_link_label: "الذهاب لصفحة الدخول"
          }
        },
        accounting: "حسابات",
        estimated: "تقديري",
        deleteBranch: {
          yes: "نعم",
          no: "لا",
          ok: "موافق",
          cannotDelete: " لا يمكنك حذف الفرع الرئيسي"
        },
        attachments: {
          title: "المرفقات",
          label1: "إسحب وأسقط ملف لتحميل الوثائق",
          label2: "بأقصى حجم 10 ميجا بايت",
          txt1: "1.يجب ان لا يتجاوز عدد المرفقات لعملية تقديم طلب التسجيل عن 5 مرفقات. ",
          txt2: "2.تنبيه, يجب ضبط اعدادات الماسح الضوئي بحيث يكون حجم الملف المضغوط أقل من. 10MB",
          txt3: "3.الاعدادات الموصى بها للماسح الضوئي هي: 1024 * 745",
          txt4: "4.الرجاء إرفاق ملف من الامتدادت التالية فقط DOC, DOCX, XLS, XLSX, PDF, JPG",
          txt5: "5.يرجى التأكد من خلو الملف المرفق من أي فيروسات أو برامج اختراق حيث سيتم رفض أي ملف يحتوي على هذا النوع من الملفات بشكل آلي."
        },
        days: [
          { key: '01', value: '01' }, { key: '02', value: '02' }, { key: '03', value: '03' }, { key: '04', value: '04' }, { key: '05', value: '05' },
          { key: '06', value: '06' }, { key: '07', value: '07' }, { key: '08', value: '08' }, { key: '09', value: '09' }, { key: '10', value: '10' },
          { key: '11', value: '11' }, { key: '12', value: '12' }, { key: '13', value: '13' }, { key: '14', value: '14' }, { key: '15', value: '15' },
          { key: '16', value: '16' }, { key: '17', value: '17' }, { key: '18', value: '18' }, { key: '19', value: '19' }, { key: '20', value: '20' },
          { key: '21', value: '21' }, { key: '22', value: '22' }, { key: '23', value: '23' }, { key: '24', value: '24' }, { key: '25', value: '25' },
          { key: '26', value: '26' }, { key: '27', value: '27' }, { key: '28', value: '28' }, { key: '29', value: '29' }, { key: '30', value: '30' },
          { key: 'LD', value: 'اليوم الأخير' }
        ],
        months: [
          { key: '01', value: '1' }, { key: '02', value: '2' }, { key: '03', value: '3' }, { key: '04', value: '4' }, { key: '05', value: '5' },
          { key: '06', value: '6' }, { key: '07', value: '7' }, { key: '08', value: '8' }, { key: '09', value: '9' }, { key: '10', value: '10' },
          { key: '11', value: '11' }, { key: '12', value: '12' }
        ],
        sharePercentageTypes: [{ "label": "%تأسست في المملكة العربية السعودية برأس مال سعودي 100", "id": "RS" },
        { "label": "%تأسست في المملكة العربية السعودية برأس مال غير سعودي 100", "id": "RF" },
        { "label": "تأسست في المملكة العربية السعودية برأس مال مختلط", "id": "RM" },
        { "label": "تأسست في إحدى دول الخليج", "id": "RG" },
        { "label": "تأسست في دول أخرى", "id": "RO" }
        ]
      },
      issueByList: [
        {
          key: "90701",
          text: 'هيئة الاتصالات وتقنية المعلومات'
        },
        {
          key: "90702",
          text: 'وزارة التجارة'
        },
        {
          key: "90703",
          text: 'وزارة الصحة'
        },
        {
          key: "90704",
          text: '	وزارة الإعلام'
        },
        {
          key: "90705",
          text: '	وزارة البيئة والمياه والزراعة'
        },
        {
          key: "90706",
          text: '	وزارة الشؤون البلدية والقروية'
        },
        {
          key: "90707",
          text: '	وزارة التعليم'
        },
        {
          key: "90708",
          text: '	المؤسسة العامة للتدريب التقني والمهني'
        },
        {
          key: "90709",
          text: '	وزارة الموارد البشرية والتنمية الاجتماعية'
        },
        {
          key: "90710",
          text: '	وزارة الشؤون الإسلامية والأوقاف والدعوة والإرشاد'
        },
        {
          key: "90711",
          text: '	وزارة الحج والعمرة'
        },
        {
          key: "90712",
          text: '	وزارة الاستثمار'
        },
        {
          key: "90713",
          text: '	الشركة السعودية للكهرباء'
        },
        {
          key: "90714",
          text: '	مؤسسة النقد العربي السعودي'
        },
        {
          key: "90715",
          text: '	الهيئة العامة للطيران المدني'
        },
        {
          key: "90716",
          text: '	وزارة الداخلية'
        },
        {
          key: "90717",
          text: '	وزارة النقل'
        },
        {
          key: "90719",
          text: '	نفس الجهة الحكومية'
        },
        {
          key: "90721",
          text: '	الأمانات'
        },
        {
          key: "90722",
          text: '	الهيئة السعودية للمحاسبين القانونيين'
        },
        {
          key: "90723",
          text: '	وزارة السياحة'
        },
        {
          key: "90725",
          text: '	وزارة العدل'
        },
        {
          key: "90729",
          text: '	الهيئة السعودية للمهندسين'
        },
        {
          key: "90724",
          text: '	وزارة الصناعة والثروة المعدنية'
        },
        {
          key: "90740",
          text: '	وزارة الرياضة'
        },
        {
          key: "90731",
          text: '	الهيئة السعودية للحياة الفطرية'
        },
        {
          key: "90732",
          text: '	الهيئة السعودية للمدن الصناعية ومناطق التقنية'
        },
        {
          key: "90733",
          text: '	الهيئة العامة للأرصاد وحماية البيئة'
        },
        {
          key: "90735",
          text: 'الهيئة العامة للغذاء والدواء'
        },
        {
          key: "90736",
          text: '	الهيئة العامة للموانئ'
        },
        {
          key: "90737",
          text: '	هيئة السوق المالية'
        },
        {
          key: "90738",
          text: '	هيئة تنظيم الكهرباء والإنتاج المزدوج'
        },
        {
          key: "90739",
          text: '	وزارة الأسكان'
        },
        {
          key: "90741",
          text: '	وزارة الطاقة'
        },
        {
          key: "90718",
          text: '	أخرى'
        }

      ],
      idTypes: [
        {
          name: "هوية وطنية",
          value: "ZS0001",
        },
        { name: "هوية مقيم", value: "ZS0002" },
        { name: "هوية خليجية", value: "ZS0003" },
        { name: "رقم الجواز", value: "FS0002" },
      ]
    },
  },
};
