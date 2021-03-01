export const employeeconstants = {
  langz: {
    eng: {
      dir: "ltr",


      employee:
      {
        nav: {
          t1: "Auditor >",
          t2: "Employee Administration",
          t3: "Back",
          placeholder1:"Contact Name",
          placeholder2:"zaed@gmail.com",
          placeholder3:"Enter Mobile Number",
          search:"Search",
          norecords:"No Employees Found",
        },
        nav1: {
          t1: "Auditor >",
          t2: "Add Employee",
          t3: "Back",
          t4: "Update Employee",
          t5: "Reactive Employee",
          t6: "User Management >",
          t7:"Task Allocation",
          t8:" Employee Administration >"
        },
        step1: {
          h1: "Employee Administration",
          t1: "All Employees",
          t2: "Active Employees",
          t3: "Inactive Employees",
          t4: "Add New Employee",
          t5: "Admin",
          t6: "Branch",
          t7: "User Number",
          t8: "Mobile Number",
          t9: "Email",
          t10: "Name",
          t11: "Status",
          upmember: "Update Member",
          deactivemember: "Deactivate Member",
          reactivatemember: "Reactivate Member",
          confirmModal: {
            t1: "Deactivate",
            t2: "What happens when the user is deactivated?",
            t3: "The user will no longer be able to sign in nor to perfom the allocated tasks",
            t4: "The user can be activated in the future from User Management area.",
            no: "No",
            deActiveBtn: "Deactivate Member",
          },
          delTaskAllocatedMember: {
            okBtn: "Ok"
          },
          isActive: {
            t1: "Admin",
            t2: "Branch",
            t3: "User Number",
            t4: "Mobile Number",
            t5: "Email",
            t6: "Active"
          },
          isInActive: {
            t1: "Admin",
            t2: "Branch",
            t3: "User Number",
            t4: "Mobile Number",
            t5: "Email",
            t6: "Inactive"
          }

        },
        step2: {
          isSuccess: {
            t1: "Employee Administration",
            t2: "Employee successfully created",
            t3: "Employee successfully updated"
          },
          isError: {
            t1: "Employee Administration",
            t2: "Employee created/updated failed",
          },
          isReactiveSuccess: {
            t1: "Employee Administration",
            t2: "Employee Re-activated successfully",
          },
          isReactiveError: {
            t1: "Employee Administration",
            t2: "Employee Re-activated failed",
          },
          isDelSuccess:{
            t1: "Employee Administration",
            t2: "Employee Deactivated successfully",
          },
          isDelError:{
            t1: "Employee Administration",
            t2: "Employee Deleted failed",
          },
          employeeDetails: {
            t1: "Employee Details",
            t2: "Complete below details",
            t3: "Name",
            t4: "Please enter a valid name",
            t5: "Email",
            t6: "Please enter a valid Email Id",
            t7: "Mobile Number",
            t8: "Mobile Number should be of 9 digit",          
            t9: "Minimum 9 Digits",
            t10: "Maximum 9 Digits",
            t11: "Branch",
            t12: "Branch Admin",
            t13: "Mobile Number should start with 5",
            t14: "Mobile Number already exists",
            add: "Add",
            update: "Update"

          },
          errorModal: {
            t1: "Do you want to change Branch admin?",
            yes: "Yes",
            no: "No",
            select: "Selected Branch already has a Branch Admin:",
            ok: "Ok"
          },
          branchListModal: {
            t1: "Assign New Supervisor for the branch",
            t2: "Branch Name:",
            t3: "Employee Number",
            t4: "Employee Name",
            t5: "Assign as Supervisor",
            save: "Save",
            cancel: "Cancel",
          }
        },
        step3:{
          t1:"Task Allocation",
          t2:"Task Allocation Successfully Linked",
          t3:"Task Allocation Failed To Linked",
          t4:"Name",
          t5:"Branch",
          t6:"TIN",
          t7:"Taxpayer Name",
          t8:"Linked Activities",
          t9:"Task Allocation",
          t10:"Taxpayer Successfully Linked",
          t11:"Taxpayer Successfully Delinked",
          t12:"Task Allocation Failed To D-Linked",
          t13:"Name",
          t14:"Branch",
          t15:"TIN",
          t16:"Taxpayer Name",
          t17:"Linked Activities",
          t18:"Do you want to Delink Taxpayer",
          confirm:"Confirm",
          ok:"Ok",
          cancel:"Cancel",
        }


      },

    },

    arb: {
      dir: "rtl",
      employee:
      {
        nav: {
          t1: "الملف الشخصي >",
          t2: "إدارة الموظفين",
          t3: "رجوع",
          placeholder1:"Contact Name",
          placeholder2:"zaed@gmail.com",
          placeholder3:"Enter Mobile Number",
          search:"بحث",
          norecords:"لم يتم العثور على موظفين",
        },
        nav1: {
          t1: "الملف الشخصي >",
          t2: "اضافة موظف",
          t3: "رجوع",
          t4: "تحديث المستخدم",
          t5: "تم إلغاء تنشيط المستخدم",
          t6:" إدارة المستخدمين >",
          t7:"توزيع المهام",
          t8:"إدارة الموظفين >"
        },
        step1: {
          h1: "إدارة الموظفين",
          t1: "جميع الموظفين",
          t2: "الموظفون النشطون",
          t3: "الموظفون غير النشطين",
          t4: "إضافة موظف جديد",
          t5: "مشرف",
          t6: "الفرع",
          t7: "رقم المستخدم",
          t8: "رقم الجوال",
          t9: "العنوان",
          t10: "الاسم",
          t11: "الحالة",
          upmember: "تحديث المستخدم",
          deactivemember: "تم إلغاء تنشيط المستخدم",
          reactivatemember: "إعادة تنشيط المستخدم",
          confirmModal: {
            t1: "إلغاء التنشيط",
            t2: "ماذا يحدث عندما يتم إلغاء تنشيط المستخدم؟",
            t3: "لن يتمكن المستخدم بعد الآن من تسجيل الدخول أو أداء المهام المخصصة",
            t4: "يمكن تنشيط المستخدم في المستقبل من خلال خدمة إدارة المستخدمين.",
            no: "لا",
            deActiveBtn: "تم إلغاء تنشيط المستخدم",
          },
          delTaskAllocatedMember: {
            okBtn: "موافق"
          },
          isActive: {
            t1: "مشرف",
            t2: "الفرع",
            t3: "رقم المستخدم",
            t4: "رقم الجوال",
            t5: "العنوان",
            t6: "نشيط"
          },
          isInActive: {
            t1: "مشرف",
            t2: "الفرع",
            t3: "رقم المستخدم",
            t4: "رقم الجوال",
            t5: "العنوان",
            t6: "غير نشط"
          }

        },
        step2: {
          isSuccess: {
            t1: "إدارة الموظفين",
            t2: "تم إنشاء الموظف بنجاح",
            t3: "تم تحديث الموظف بنجاح"
          },
          isError: {
            t1: "إدارة الموظفين",
            t2: "حدث خطأ اثناء تحديث الموظف",
          },
          isReactiveSuccess: {
            t1: "إدارة الموظفين",
            t2: "تمت إعادة تنشيط الموظف بنجاح",
          },
          isReactiveError: {
            t1: "إدارة الموظفين",
            t2: "فشل إعادة تنشيط الموظف",
          },
          isDelSuccess:{
            t1: "إدارة الموظفين",
            t2: "تم إلغاء تنشيط الموظف بنجاح",
          },
          isDelError:{
            t1: "إدارة الموظفين",
            t2: "حدث خطأ اثناء حذف الموظف",
          },
          employeeDetails: {
            t1: "تفاصيل الموظف",
            t2: "أكمل التفاصيل أدناه",
            t3: "الاسم",
            t4: "الرجاء إدخال اسم صحيح",
            t5: "البريدالإلكتروني",
            t6: "الرجاء إدخال بريد إلكتروني صحيح",
            t7: "رقم الهاتف",
            t8: "يفترض بأن يكون رقم هاتف الجوال مكون من 9 أرقام",
            t9: "حد أدنى 9 أرقام",
            t10: "9 أرقام كحد أقصى",
            t11: "الفرع",
            t12: "مشرف فرع",
            t13:" رقم هاتف الجوال يفترض بأن يبدأ بـ 5",
            t14:"رقم الجوال موجود مسبقاً",
            add: "إضافة",
            update: "تحديث",

          },
          errorModal: {
            t1: "هل تريد تغيير مشرف الفرع؟",
            yes: "نعم",
            no: "لا",
            select: "الفرع المختار يوجد لديه مشرف فرع مسبقاً ",
            ok: "موافق"
          },
          branchListModal: {
            t1: "تعيين مشرف جديد للفرع",
            t2: "اسم الفرع:",
            t3: "رقم الموظف",
            t4: "اسم الموظف",
            t5: "تعيين كمشرف",
            save: "حفظ",
            cancel: "إلغاء",
          }
        },
        step3:{
          t1:"توزيع المهام",
          t2:"تم ربط تخصيص المهام بنجاح",
          t3:"فشل تخصيص المهام المرتبط",
          t4:"الاسم",
          t5:"الفرع",
          t6:"الرقم المميز",
          t7:"اسم المكلف",
          t8:"الأنشطة المرتبطة",
          t9:"توزيع المهام",
          t10:"تم ربط المكلف بنجاح",
          t11:"تم فك ارتباط دافع الضرائب بنجاح",
          t12:"حدث خطأ اثناء إلغاء الارتباط",
          t13:"الاسم",
          t14:"الفرع",
          t15:"الرقم المميز",
          t16:"اسم المكلف",
          t17:"الأنشطة المرتبطة",
          t18:"هل تريد فك ارتباط المكلف",
          confirm:"تأكيد",
          ok:"موافق",
          cancel:"Cancel",
        }


      },

      zacatcit: {
        p1: "بحث",
        c1: {
          t1: "الرقم المرجعي",
          t2: "تاريخ الاستحقاق"
        }

      }

    },
  },
};
