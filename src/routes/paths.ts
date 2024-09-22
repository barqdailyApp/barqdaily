// ----------------------------------------------------------------------

const ROOTS = {
  AUTH: "/auth",
  DASHBOARD: "/dashboard",
};

// ----------------------------------------------------------------------

export const paths = {
  minimalUI: "https://mui.com/store/items/minimal-dashboard/",
  // AUTH
  auth: {
    jwt: {
      login: `${ROOTS.AUTH}/jwt/login`,
      register: `${ROOTS.AUTH}/jwt/register`,
    },
  },
  // DASHBOARD
  dashboard: {
    root: ROOTS.DASHBOARD,
    subscribers: {
      root: `${ROOTS.DASHBOARD}/subscribers`,
      newTrainee: `${ROOTS.DASHBOARD}/subscribers/trainee/new`,
      traineeDetails: (traineeId: string) =>
        `${ROOTS.DASHBOARD}/subscribers/trainee/details/${traineeId}`,
      editTrainee: (traineeId: string) =>
        `${ROOTS.DASHBOARD}/subscribers/trainee/${traineeId}`,
      newParent: `${ROOTS.DASHBOARD}/subscribers/parent/new`,
      editParent: (parentId: string) =>
        `${ROOTS.DASHBOARD}/subscribers/parent/${parentId}`,
    },
    settings: {
      root: `${ROOTS.DASHBOARD}/settings`,
      myAcademy: `${ROOTS.DASHBOARD}/settings/my-academy`,
      academySubscription: `${ROOTS.DASHBOARD}/settings/academy-subscription`,
      permissions: `${ROOTS.DASHBOARD}/settings/permissions`,
      termsOfUse: `${ROOTS.DASHBOARD}/settings/terms-of-use`,
      privacyPolicy: `${ROOTS.DASHBOARD}/settings/privacy-policy`,
      faq: `${ROOTS.DASHBOARD}/settings/faq`,
    },
    coursesManagement: `${ROOTS.DASHBOARD}/courses-management`,
    employees: `${ROOTS.DASHBOARD}/employees`,
    profile: `${ROOTS.DASHBOARD}/profile`,
    support: `${ROOTS.DASHBOARD}/support`,
    blog: {
      root: `${ROOTS.DASHBOARD}/blog`,
      create: `${ROOTS.DASHBOARD}/blog/new`,
      edit: `${ROOTS.DASHBOARD}/blog/edit`,
    },
    profits: `${ROOTS.DASHBOARD}/profits`,
    notifications: `${ROOTS.DASHBOARD}/notifications`,
    reports: `${ROOTS.DASHBOARD}/reports-and-statistics`,
    loyalty: `${ROOTS.DASHBOARD}/loyalty`,
    offers: `${ROOTS.DASHBOARD}/offers`,
    membership: `${ROOTS.DASHBOARD}/membership`,
  },
};
