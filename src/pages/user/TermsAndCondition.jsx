import React from 'react';

const TermsAndConditions = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white text-gray-800 my-10 rounded-xl shadow-lg">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-3 text-red-600">Terms & Conditions</h1>
        <p className="text-gray-500">Last updated: {new Date().toLocaleDateString()}</p>
      </div>

      <div className="space-y-8">
        <section className="border-l-4 border-red-500 pl-5">
          <h2 className="text-2xl font-semibold mb-3 flex items-center">
            <span className="bg-red-100 text-red-600 rounded-full w-8 h-8 flex items-center justify-center mr-3">1</span>
            Introduction
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Welcome to <span className="font-semibold text-red-500">CraveHut</span>! By accessing our services, you agree to be bound by these terms and conditions.
            Please read them carefully before using our website or mobile application.
          </p>
        </section>

        <section className="border-l-4 border-red-500 pl-5">
          <h2 className="text-2xl font-semibold mb-3 flex items-center">
            <span className="bg-red-100 text-red-600 rounded-full w-8 h-8 flex items-center justify-center mr-3">2</span>
            Eligibility
          </h2>
          <p className="text-gray-700 leading-relaxed">
            You must be at least 18 years old to use our services or have the involvement of a parent or guardian.
          </p>
        </section>

        <section className="border-l-4 border-red-500 pl-5">
          <h2 className="text-2xl font-semibold mb-3 flex items-center">
            <span className="bg-red-100 text-red-600 rounded-full w-8 h-8 flex items-center justify-center mr-3">3</span>
            Services
          </h2>
          <p className="text-gray-700 leading-relaxed">
            CraveHut offers a platform for users to order food from a variety of restaurants. We do not prepare food but act as a facilitator between users and food vendors.
          </p>
        </section>

        <section className="border-l-4 border-red-500 pl-5">
          <h2 className="text-2xl font-semibold mb-3 flex items-center">
            <span className="bg-red-100 text-red-600 rounded-full w-8 h-8 flex items-center justify-center mr-3">4</span>
            Account Responsibility
          </h2>
          <p className="text-gray-700 leading-relaxed">
            You are responsible for maintaining the confidentiality of your account credentials and agree to accept responsibility for all activities that occur under your account.
          </p>
        </section>

        <section className="border-l-4 border-red-500 pl-5">
          <h2 className="text-2xl font-semibold mb-3 flex items-center">
            <span className="bg-red-100 text-red-600 rounded-full w-8 h-8 flex items-center justify-center mr-3">5</span>
            Payments
          </h2>
          <p className="text-gray-700 leading-relaxed">
            All payments must be made through the available payment options. CraveHut is not liable for any payment processing issues from third-party providers.
          </p>
        </section>

        <section className="border-l-4 border-red-500 pl-5">
          <h2 className="text-2xl font-semibold mb-3 flex items-center">
            <span className="bg-red-100 text-red-600 rounded-full w-8 h-8 flex items-center justify-center mr-3">6</span>
            Cancellation & Refunds
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Orders can be cancelled within a specified time. Refunds will be processed based on our refund policy. We reserve the right to deny refunds in case of violations.
          </p>
        </section>

        <section className="border-l-4 border-red-500 pl-5">
          <h2 className="text-2xl font-semibold mb-3 flex items-center">
            <span className="bg-red-100 text-red-600 rounded-full w-8 h-8 flex items-center justify-center mr-3">7</span>
            User Conduct
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Users agree not to misuse the services provided by CraveHut. Any fraudulent, offensive, or abusive behavior will lead to account termination.
          </p>
        </section>

        <section className="border-l-4 border-red-500 pl-5">
          <h2 className="text-2xl font-semibold mb-3 flex items-center">
            <span className="bg-red-100 text-red-600 rounded-full w-8 h-8 flex items-center justify-center mr-3">8</span>
            Changes to Terms
          </h2>
          <p className="text-gray-700 leading-relaxed">
            We may update these Terms and Conditions from time to time. Continued use of the service after changes means you accept the updated terms.
          </p>
        </section>

        <section className="border-l-4 border-red-500 pl-5">
          <h2 className="text-2xl font-semibold mb-3 flex items-center">
            <span className="bg-red-100 text-red-600 rounded-full w-8 h-8 flex items-center justify-center mr-3">9</span>
            Contact Us
          </h2>
          <p className="text-gray-700 leading-relaxed">
            If you have any questions or concerns regarding these terms, please contact us at <a href="mailto:support@cravehut.com" className="text-red-500 hover:underline">support@cravehut.com</a>.
          </p>
        </section>
      </div>

      <div className="mt-12 pt-6 border-t border-gray-200 text-center">
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} CraveHut. All rights reserved.
        </p>
        <p className="text-xs text-gray-400 mt-1">
          Version 1.0.0
        </p>
      </div>
    </div>
  );
};

export default TermsAndConditions;