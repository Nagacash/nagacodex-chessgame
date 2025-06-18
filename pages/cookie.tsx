
import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

const CookiePolicyPage: React.FC = () => {
  const companyName = "Naga Codex";
  const contactEmail = "chosenfewrecords@hotmail.de";
  const appName = "Naga Codex AI Chess";
  const currentDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <>
      <Head>
        <title>Cookie Policy - Naga Codex AI Chess</title>
      </Head>
      <div className="min-h-screen bg-slate-800 text-slate-200 p-4 sm:p-8 flex flex-col items-center">
        <div className="w-full max-w-3xl bg-slate-700 p-6 sm:p-8 rounded-lg shadow-xl">
          <header className="mb-6 text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-emerald-400 font-dynapuff">Cookie Policy</h1>
            <p className="text-sm text-slate-400">Last Updated: {currentDate}</p>
          </header>

          <section className="mb-6 space-y-3">
            <h2 className="text-2xl font-semibold text-emerald-300">1. What Are Cookies?</h2>
            <p>Cookies are small text files that are stored on your device (computer, tablet, mobile) when you visit certain websites or use applications. They are widely used to make websites and applications work, or work more efficiently, as well as to provide information to the owners of the site/application.</p>
            <p>In the context of our application, {appName}, we use local storage, which is a similar web storage technology, to remember your preferences.</p>
          </section>

          <section className="mb-6 space-y-3">
            <h2 className="text-2xl font-semibold text-emerald-300">2. How We Use Cookies (and Local Storage)</h2>
            <p>We use local storage for the following purposes:</p>
            <ul className="list-disc list-inside space-y-1 pl-4">
              <li><strong>Essential/Functional Storage:</strong> We use local storage to remember your cookie consent preferences. If you accept or decline our use of cookies via the banner, this choice is stored locally on your device so that we do not have to ask you again on subsequent visits. This is essential for respecting your choice.</li>
            </ul>
            <p>Currently, {appName} does not use cookies or local storage for analytics, advertising, or tracking purposes beyond remembering your consent choice.</p>
            <p>For a comprehensive understanding of our data practices, please also refer to our <Link href="/privacy" legacyBehavior><a className="text-emerald-400 hover:underline">Privacy Policy</a></Link>.</p>
          </section>

          <section className="mb-6 space-y-3">
            <h2 className="text-2xl font-semibold text-emerald-300">3. Types of Cookies We Use</h2>
            <p>As mentioned, we primarily use local storage for functional purposes:</p>
            <ul className="list-disc list-inside space-y-1 pl-4">
              <li><strong>`cookieConsent` (Local Storage Item):</strong> This item stores whether you have 'accepted' or 'declined' cookies. It is persistent until you clear your browser's local storage for our site.</li>
            </ul>
          </section>

          <section className="mb-6 space-y-3">
            <h2 className="text-2xl font-semibold text-emerald-300">4. Your Choices Regarding Cookies</h2>
            <p>When you first visit our App, you will see a cookie banner asking for your consent.</p>
            <ul className="list-disc list-inside space-y-1 pl-4">
              <li><strong>Accepting:</strong> If you click "Accept", we will store your preference in local storage, and the banner will be dismissed.</li>
              <li><strong>Declining:</strong> If you click "Decline", we will also store this preference in local storage, and the banner will be dismissed. Functionality related to non-essential cookies (if any were to be added in the future) might be limited.</li>
            </ul>
            <p>You can manage or delete local storage items through your browser settings. If you delete the `cookieConsent` item, you will be presented with the cookie banner again on your next visit.</p>
            <p>Most web browsers allow some control of most cookies through the browser settings. To find out more about cookies, including how to see what cookies have been set, visit <a href="https://www.aboutcookies.org" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline">www.aboutcookies.org</a> or <a href="https://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline">www.allaboutcookies.org</a>.</p>
          </section>
          
          <section className="mb-6 space-y-3">
            <h2 className="text-2xl font-semibold text-emerald-300">5. Changes to This Cookie Policy</h2>
            <p>We may update this Cookie Policy from time to time. The updated version will be indicated by an updated "Last Updated" date. We encourage you to review this policy frequently.</p>
          </section>

          <section className="mb-6 space-y-3">
            <h2 className="text-2xl font-semibold text-emerald-300">6. Contact Us</h2>
            <p>If you have questions or comments about this Cookie Policy, you may contact us:</p>
            <ul className="list-none space-y-1 pl-4">
              <li><strong>Company:</strong> {companyName}</li>
              <li><strong>Email:</strong> {contactEmail}</li>
            </ul>
          </section>

          <div className="mt-8 text-center">
            <Link href="/" legacyBehavior>
              <a className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-md shadow focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50 transition-colors"
                 aria-label="Back to game">
                Back to Game
              </a>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default CookiePolicyPage;
