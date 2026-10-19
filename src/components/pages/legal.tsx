export const legal: Record<
  string,
  { intro: string; sections: [string, string][] }
> = {
  privacy: {
    intro:
      "This draft describes the intended handling of information on Central Florida Locale. Owner contact details and the final service-provider list must be confirmed before public launch.",
    sections: [
      [
        "Information you choose to share",
        "Contact and intake forms request information relevant to your inquiry, such as your name, email, optional phone number and goals. Avoid sending financial account numbers, identity documents or sensitive personal details.",
      ],
      [
        "How inquiries are handled",
        "When delivery is configured, submissions are sent to the designated service provider so the business can respond. In the current unconfigured preview, forms return an error and do not claim to store your inquiry.",
      ],
      [
        "Newsletter choices",
        "Newsletter enrollment is optional and separate from an ordinary inquiry. Subscription delivery is not active until a provider is configured.",
      ],
      [
        "Analytics and cookies",
        "External analytics are inactive by default. Review the final provider configuration and cookie requirements before launch.",
      ],
      [
        "Questions and requests",
        "The business must supply a verified privacy contact, retention policy and any applicable rights process before publication.",
      ],
    ],
  },
  terms: {
    intro:
      "Draft terms for owner and legal review. These do not establish that the site is legally approved for public use.",
    sections: [
      [
        "Educational information",
        "Content is general educational material. It is not individualized legal, tax, financial, lending or investment advice. Obtain advice appropriate to your circumstances.",
      ],
      [
        "Verify before deciding",
        "Property requirements, association rules and market conditions change. Confirm information with authoritative current sources and qualified professionals before making commitments.",
      ],
      [
        "No guarantees",
        "The site does not guarantee transaction outcomes, investment performance, property availability or specific service results.",
      ],
      [
        "Resources and external links",
        "Planning worksheets are starting points, not substitutes for contracts or professional advice. External websites operate under their own terms.",
      ],
    ],
  },
  accessibility: {
    intro:
      "Central Florida Locale aims to make educational content and inquiry workflows usable by as many people as possible.",
    sections: [
      [
        "Our approach",
        "We target WCAG 2.2 AA through semantic structure, keyboard access, visible focus, accessible labels, clear errors and reduced-motion support. This statement is not a certification.",
      ],
      [
        "Using the site",
        "Use the skip link to reach main content. Menus can be closed with Escape. Comparison tables may scroll horizontally on smaller screens and have a keyboard-focusable container.",
      ],
      [
        "Continuing improvements",
        "Accessibility requires ongoing testing as content and integrations change. A verified contact channel for accessibility feedback must be added before launch.",
      ],
    ],
  },
  disclosures: {
    intro:
      "Required brokerage, licensing and advertising details are awaiting confirmation. This preview is not approved for public real estate advertising.",
    sections: [
      [
        "Business identity",
        "Central Florida Locale is the proposed brand. The approved professional name, brokerage name, license details and required advertising language have not been supplied.",
      ],
      [
        "Listings and memberships",
        "No live MLS or IDX feed is connected. No MLS, REALTOR® or other membership is claimed. Illustrative photography does not depict active listings or verified views of named communities.",
      ],
      [
        "Local and market information",
        "No invented current market figures are presented. Property-specific fees, school boundaries, rental permissions and other requirements must be verified through current sources.",
      ],
      [
        "Fair housing",
        "Educational comparisons focus on property characteristics, costs, access and user-stated goals. They should not be used to steer people based on protected characteristics.",
      ],
      [
        "Before public launch",
        "The owner must supply approved brokerage and agent disclosures, confirm image rights and complete appropriate compliance review.",
      ],
    ],
  },
};
