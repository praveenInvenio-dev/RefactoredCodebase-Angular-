export const attachmentConstants = {
  langz: {
    eng: {
      dir: "ltr",
      attachment: {
        err: {
          fileSizeError: "File size should be less than 10 MB",
          fileTypeError: "Choose only file with extension DOC, DOCX, XLS, XLSX, PDF, JPG",
          minFileSizeError: "File Name,Doc Type,Ret.Guid and File Content can not be blank in action N"
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
          continue: "Continue"
        }
      }
    },
    arb: {
      dir: "rtl",
      attachment: {
        err: {
          fileSizeError: "يجب ان يكون حجم الملف المرفق اقل من 10 ميجا",
          fileTypeError: "الرجاء إختيار ملف من الإمتدادات التالية فقط DOC, DOCX, XLS, XLSX, PDF, JPG",
          minFileSizeError: "عذراً، لا يمكن أن يكون اسم الملف، نوع الملف، ومحتوى الملف فارغاً للنشر"
        },
        attachments: {
          title: "المرفقات",
          label1: "إسحب وأسقط ملف لتحميل الوثائق",
          label2: "بأقصى حجم 10 ميجا بايت",
          txt1: "1.يجب ان لا يتجاوز عدد المرفقات لعملية تقديم طلب التسجيل عن 5 مرفقات. ",
          txt2: "2.تنبيه, يجب ضبط اعدادات الماسح الضوئي بحيث يكون حجم الملف المضغوط أقل من. 10MB",
          txt3: "3.الاعدادات الموصى بها للماسح الضوئي هي: 1024 * 745",
          txt4: "4.الرجاء إرفاق ملف من الامتدادت التالية فقط DOC, DOCX, XLS, XLSX, PDF, JPG",
          txt5: "5.يرجى التأكد من خلو الملف المرفق من أي فيروسات أو برامج اختراق حيث سيتم رفض أي ملف يحتوي على هذا النوع من الملفات بشكل آلي.",
          continue: "متابعة"
        }
      }
    }
  }
};
