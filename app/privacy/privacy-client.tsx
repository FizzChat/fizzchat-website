'use client';

import { LegalPage } from '../_components/legal-page';
import { useSitePrefs } from '../_components/prefs';

export default function PrivacyClient() {
  const { dict } = useSitePrefs();
  return <LegalPage doc={dict.privacy} />;
}
