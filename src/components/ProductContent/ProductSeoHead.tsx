import Head from "next/head";
import React from "react";

interface ProductSeoHeadProps {
  seoData: {
    title?: string;
    canonical?: string;
    og_title?: string;
    og_description?: string;
    og_url?: string;
    og_locale?: string;
    og_type?: string;
    og_site_name?: string;
    twitter_card?: string;
  };
  pathname: string;
}

export const ProductSeoHead: React.FC<ProductSeoHeadProps> = ({
  seoData,
  pathname,
}) => (
  <Head>
    <title>{seoData.title || "Bilobrov"}</title>
    <link rel="canonical" href={seoData.canonical || pathname} />
    {seoData.og_title && (
      <meta property="og:title" content={seoData.og_title} />
    )}
    {seoData.og_description && (
      <meta property="og:description" content={seoData.og_description} />
    )}
    {seoData.og_url && <meta property="og:url" content={seoData.og_url} />}
    {seoData.og_locale && (
      <meta property="og:locale" content={seoData.og_locale} />
    )}
    {seoData.og_type && <meta property="og:type" content={seoData.og_type} />}
    {seoData.og_site_name && (
      <meta property="og:site_name" content={seoData.og_site_name} />
    )}
    {seoData.twitter_card && (
      <meta name="twitter:card" content={seoData.twitter_card} />
    )}
    <meta
      name="robots"
      content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
    />
  </Head>
);
