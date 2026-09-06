'use client';

import { LegalPage } from '../_components/legal-page';
import { useSitePrefs } from '../_components/prefs';

export default function TermsClient() {
  const { dict } = useSitePrefs();
  return <LegalPage doc={dict.terms} />;
}
