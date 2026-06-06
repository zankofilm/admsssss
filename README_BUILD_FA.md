# راهنمای ساخت خروجی‌ها

این بسته دو خروجی جدا دارد:

1. نسخه ویندوز ادمین Electron
   - Workflow: `.github/workflows/windows-exe.yml`
   - خروجی: `dist/*.exe`
   - Publish روی GitHub Release خاموش شده است.

2. نسخه موبایل ادمین Android WebView
   - پوشه پروژه: `mobile-admin/`
   - Workflow: `.github/workflows/android.yml`
   - خروجی: `mobile-admin/app/build/outputs/apk/debug/*.apk`

برای اجرای دستی در GitHub:
Actions → انتخاب workflow → Run workflow

نکته نسخه V2:
اگر قبلاً فایل workflow قدیمی با مرحله Prepare Android SDK یا دستور sdkmanager داشتید، آن را حذف کنید. فقط همین فایل زیر را نگه دارید:
.github/workflows/android.yml
