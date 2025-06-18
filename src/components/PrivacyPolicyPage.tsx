import React from 'react';

interface PrivacyPolicyPageProps {
  onNavigateBack: () => void;
}

const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({ onNavigateBack }) => {
  const companyName = "Naga Codex";
  const contactEmail = "chosenfewrecords@hotmail.de";
  const ownerName = "Maurice Holda";
  const city = "Hamburg";
  const currentDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="min-h-screen bg-slate-800 text-slate-200 p-4 sm:p-8 flex flex-col items-center">
      <div className="w-full max-w-3xl bg-slate-700 p-6 sm:p-8 rounded-lg shadow-xl">
        <header className="mb-6 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-emerald-400 font-dynapuff">Privacy Policy</h1>
          <p className="text-sm text-slate-400">Last Updated: {currentDate}</p>
        </header>

        <section className="mb-6 space-y-3">
          <h2 className="text-2xl font-semibold text-emerald-300">1. Introduction</h2>
          <p>Welcome to {companyName} ("we," "our," "us"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains what information we collect, how we use it, and what rights you have in relation to it. This policy applies to all information collected through our application (the "App") and/or any related services, sales, marketing or events.</p>
        </section>

        <section className="mb-6 space-y-3">
          <h2 className="text-2xl font-semibold text-emerald-300">2. Information We Collect</h2>
          <p>Currently, our App primarily functions as a chess game against an AI. The information processed includes:</p>
          <ul className="list-disc list-inside space-y-1 pl-4">
            <li><strong>Game State Data:</strong> To enable gameplay and AI responses, we process the current state of your chess game (board positions, moves made). This data is sent to the Gemini API to generate AI moves.</li>
            <li><strong>Technical Data:</strong> We may implicitly collect technical data such as IP address or device information through your interaction with the Gemini API, governed by Google's Privacy Policy. We do not store this data ourselves.</li>
            <li><strong>Cookie Consent:</strong> We store your cookie consent preferences locally in your browser using localStorage.</li>
          </ul>
          <p>We do not knowingly collect or solicit personally identifiable information from users directly within the App beyond what is necessary for the AI to function or for cookie consent.</p>
        </section>

        <section className="mb-6 space-y-3">
          <h2 className="text-2xl font-semibold text-emerald-300">3. How We Use Your Information</h2>
          <p>We use the information we collect or receive:</p>
          <ul className="list-disc list-inside space-y-1 pl-4">
            <li><strong>To provide and maintain our App:</strong> Primarily, to allow you to play chess against the AI.</li>
            <li><strong>To improve our App:</strong> Understanding game patterns (anonymously) might help us improve AI difficulty or features in the future.</li>
            <li><strong>To manage cookie preferences:</strong> To remember your consent choices.</li>
          </ul>
        </section>

        <section className="mb-6 space-y-3">
          <h2 className="text-2xl font-semibold text-emerald-300">4. Sharing Your Information</h2>
          <p>We may share information in the following situations:</p>
          <ul className="list-disc list-inside space-y-1 pl-4">
            <li><strong>With Service Providers:</strong> Game state data is shared with Google (Gemini API) to provide the AI opponent feature. Their use of data is governed by their respective privacy policies.</li>
            <li><strong>Legal Requirements:</strong> We may disclose your information if required to do so by law.</li>
          </ul>
        </section>
        
        <section className="mb-6 space-y-3">
          <h2 className="text-2xl font-semibold text-emerald-300">5. Data Security</h2>
          <p>We use reasonable measures to protect the information transmitted through our App. However, no electronic transmission or storage is 100% secure. Game state data sent to the Gemini API is subject to Google's security practices.</p>
        </section>

        <section className="mb-6 space-y-3">
          <h2 className="text-2xl font-semibold text-emerald-300">6. Your Data Rights</h2>
          <p>Depending on your location, you may have certain rights regarding your personal data. Since we collect minimal personal data directly, these rights are primarily exercised in relation to the data held by our service providers (e.g., Google).</p>
           <p>For cookie consent, you can change your preferences by clearing your browser's localStorage for this site.</p>
        </section>

        <section className="mb-6 space-y-3">
          <h2 className="text-2xl font-semibold text-emerald-300">7. Cookie Policy</h2>
          <p>For more information about how we use cookies, please see our <button onClick={() => {/*This should ideally navigate to cookie policy directly if App.tsx handles this*/} } className="text-emerald-400 hover:underline">Cookie Policy</button>.</p>
        </section>

        <section className="mb-6 space-y-3">
          <h2 className="text-2xl font-semibold text-emerald-300">8. Changes to This Privacy Policy</h2>
          <p>We may update this privacy policy from time to time. The updated version will be indicated by an updated "Last Updated" date. We encourage you to review this privacy policy frequently to be informed of how we are protecting your information.</p>
        </section>

        <section className="mb-6 space-y-3">
          <h2 className="text-2xl font-semibold text-emerald-300">9. Contact Us</h2>
          <p>If you have questions or comments about this policy, you may contact us:</p>
          <ul className="list-none space-y-1 pl-4">
            <li><strong>Owner:</strong> {ownerName}</li>
            <li><strong>Company:</strong> {companyName}</li>
            <li><strong>Email:</strong> {contactEmail}</li>
            <li><strong>City:</strong> {city}</li>
          </ul>
        </section>

        <div className="mt-8 text-center">
          <button
            onClick={onNavigateBack}
            className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-md shadow focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50 transition-colors"
            aria-label="Back to game"
          >
            Back to Game
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
