import { addCollection } from '@iconify/vue';

export async function registerIconifyIcon() {
  const [
    { icons: antDesignData },
    { icons: bxData },
    { icons: carbonData },
    { icons: icData },
    { icons: ionData },
    { icons: logosData },
    { icons: lucideData },
    { icons: mdiData },
  ] = await Promise.all([
    import('@iconify-json/ant-design'),
    import('@iconify-json/bx'),
    import('@iconify-json/carbon'),
    import('@iconify-json/ic'),
    import('@iconify-json/ion'),
    import('@iconify-json/logos'),
    import('@iconify-json/lucide'),
    import('@iconify-json/mdi'),
  ]);

  // Register icon collections globally
  addCollection(antDesignData);
  addCollection(bxData);
  addCollection(carbonData);
  addCollection(icData);
  addCollection(ionData);
  addCollection(logosData);
  addCollection(lucideData);
  addCollection(mdiData);
}
