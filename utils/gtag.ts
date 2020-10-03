export const pageview = (url: string) => {
  // @ts-ignore
  window.gtag('config', process.env.NEXT_PUBLIC_GA_TRACKING_ID, {
    page_path: url,
  })
}
