import {
    BadgeDollarSign,
    BarChart3,
    BedDouble,
    Building,
    Building2,
    Eye,
    FileSignature,
    Heart,
    History,
    Home,
    KeyRound,
    LandPlot,
    LayoutDashboard,
    MessageCircle,
    Rocket,
    Search,
    Star,
    StarCheck,
    TextSearch,
    User,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { OptionType } from '@/types'

/* ────────────────────────────  SearchHeader  ──────────────────────────── */

export const SEARCH_HEADER = {
    locations: [
        'Mumbai',
        'Delhi',
        'Bengaluru',
        'Hyderabad',
        'Pune',
        'Chennai',
        'Kolkata',
        'Jaipur',
        'Ahmedabad',
        'Gurgaon',
        'Noida',
    ],
    bhkOptions: ['1 BHK', '2 BHK', '3 BHK', '4 BHK', '5+ BHK'],
    constructionStatus: ['Under Construction', 'Ready to Move', 'New Launch', 'Resale'],
    postedBy: ['Owner', 'Builder', 'Agent'],
    propertyTypes: ['Apartment', 'Villa', 'Independent House', 'Plot', 'Commercial', 'Farmhouse'],
    amenities: [
        'Gym',
        'Swimming Pool',
        'Parking',
        'Garden',
        'Security',
        'Lift',
        'Club House',
        'Kids Play Area',
    ],
    menuItems: [
        { label: 'Agent Pro', href: '#' },
        { label: 'Builder Pro', href: '#' },
        { label: 'For Rent', href: '#' },
        { label: 'About Us', href: '#' },
        { label: 'Contact Us', href: '#' },
        { label: 'Articles & News', href: '#' },
        { label: 'Get Help', href: '#' },
        { label: 'Download App', href: '#' },
    ],
    budgetMin: 0,
    budgetMax: 50000000,
    budgetStep: 100000,
    searchPlaceholder: 'Find your Dream Home',
}

/* ────────────────────────────  SimpleHeader  ──────────────────────────── */

export const SIMPLE_HEADER = {
    exploreItems: [
        { label: 'Properties', href: '/properties' },
        { label: 'Agents', href: '/agents' },
        { label: 'About', href: '/about' },
    ],
}

/* ────────────────────────────  HeaderSidebar  ─────────────────────────── */

export interface SidebarActivityItem {
    label: string
    icon: LucideIcon
    href: string
}

export interface SidebarQuickStat {
    icon: LucideIcon
    label: string
    count: string
}

export interface SidebarLink {
    label: string
    href: string
}

export interface SidebarSocialLink {
    name: string
    href: string
    path: string
}

export const HEADER_SIDEBAR = {
    activityItems: [
        { label: 'Contracted Property', icon: FileSignature, href: '/login' },
        { label: 'Recently Viewed', icon: History, href: '/login' },
        { label: 'Saved Properties', icon: Heart, href: '/login' },
        { label: 'Recently Searched', icon: Search, href: '/login' },
        { label: 'Pay for Results', icon: BadgeDollarSign, href: '/login' },
        { label: 'My Reviews', icon: Star, href: '/login' },
        { label: 'Insights', icon: BarChart3, href: '/login' },
    ] satisfies SidebarActivityItem[],
    menuItems: [
        { label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
        { label: 'Message', icon: MessageCircle, href: '/messages' },
    ] satisfies SidebarActivityItem[],
    quickStats: [
        { icon: Building2, label: 'Contracted Property', count: '00' },
        { icon: Eye, label: 'Recently Viewed', count: '00' },
        { icon: StarCheck, label: 'Saved Properties', count: '00' },
        { icon: TextSearch, label: 'Recently Searched', count: '00' },
    ] satisfies SidebarQuickStat[],
    moreLinks: [
        { label: 'My Reviews', href: '/reviews' },
        { label: 'Insights', href: '/insights' },
        { label: 'Pay for Results', href: '/login' },
        { label: 'Saved Properties', href: '/login' },
    ] satisfies SidebarLink[],
    bottomLinks: [
        { label: 'About Us', href: '/about' },
        { label: 'Contact Us', href: '/contact' },
        { label: 'Articles', href: '/articles' },
        { label: 'Report a Fraud', href: '/login' },
        { label: 'Visit Help Center', href: '/login' },
    ] satisfies SidebarLink[],
    socialLinks: [
        {
            name: 'Facebook',
            href: '#',
            path: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
        },
        {
            name: 'Instagram',
            href: '#',
            path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z',
        },
        {
            name: 'X',
            href: '#',
            path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
        },
        {
            name: 'Pinterest',
            href: '#',
            path: 'M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z',
        },
    ] satisfies SidebarSocialLink[],
    images: {
        guestProfile: '/common/guest_profile.png',
        queryIllustration: '/common/query_illustrations.png',
        helpCenter: '/icon/help_center.png',
    },
    texts: {
        greeting: 'Hello',
        subtitle: 'Easy Seller Contact \n Connect directly with verified sellers',
        loginButton: 'Login/ Register',
        myActivityTitle: 'My Activity',
        sellTitle: 'Looking to sell / rent your property?',
        postPropertyButton: 'Post property for free',
        helpCenter: 'Visit Help Center',
        followOn: 'Follow on',
        searchPlaceholder: 'Search a Property Code',
        contactLabel: 'Contact Number:',
    },
    contactNumber: '+91 743755845',
}

/* ────────────────────────────  SearchBox  ─────────────────────────────── */

export interface SearchBoxTab {
    label: string
    value: string
    Icon: LucideIcon
}

export const SEARCH_BOX = {
    tabs: [
        { label: 'Buy', value: 'buy', Icon: Home },
        { label: 'Rent', value: 'rent', Icon: KeyRound },
        { label: 'PG/Coliving', value: 'pg', Icon: BedDouble },
        { label: 'New Launch', value: 'new-launch', Icon: Rocket },
        { label: 'Commercial', value: 'commercial', Icon: Building2 },
        { label: 'Plot/Land', value: 'plot', Icon: LandPlot },
        { label: 'Project', value: 'project', Icon: Building },
        { label: 'Agent', value: 'agent', Icon: User },
    ] satisfies SearchBoxTab[],
    popularSearches: ['3BHK in Noida', 'Flats in NCR', 'Plots in NCR'],
    localityOptions: [
        { value: 'sector-62', label: 'Sector 62, Noida' },
        { value: 'sector-150', label: 'Sector 150, Noida' },
        { value: 'golf-course-extension', label: 'Golf Course Extension, Gurgaon' },
        { value: 'dlf-phase-4', label: 'DLF Phase 4, Gurgaon' },
        { value: 'indirapuram', label: 'Indirapuram, Ghaziabad' },
        { value: 'vaishali', label: 'Vaishali, Ghaziabad' },
        { value: 'south-delhi', label: 'South Delhi' },
    ] satisfies OptionType[],
    budgetOptions: [
        { value: 'under-30l', label: 'Under ₹30 L' },
        { value: '30-50l', label: '₹30 L - ₹50 L' },
        { value: '50-75l', label: '₹50 L - ₹75 L' },
        { value: '75l-1cr', label: '₹75 L - ₹1 Cr' },
        { value: '1-1.5cr', label: '₹1 Cr - ₹1.5 Cr' },
        { value: '1.5-3cr', label: '₹1.5 Cr - ₹3 Cr' },
        { value: 'above-3cr', label: 'Above ₹3 Cr' },
    ] satisfies OptionType[],
    propertyTypeOptions: [
        { value: 'flat', label: 'Flat / Apartment' },
        { value: 'villa', label: 'Villa' },
        { value: 'house', label: 'House' },
        { value: 'plot', label: 'Plot / Land' },
        { value: 'builder-floor', label: 'Independent Builder Floor' },
        { value: 'office', label: 'Office / Commercial' },
        { value: 'shop', label: 'Shop' },
        { value: 'pg', label: 'PG / Hostel' },
    ] satisfies OptionType[],
}

export const LocationList: OptionType[] = [
  { value: "delhi", label: "Delhi" },
  { value: "ghaziabad", label: "Ghaziabad" },
  { value: "faridabad", label: "Faridabad" },
  { value: "meerut", label: "Meerut" },
  { value: "noida", label: "Noida" },
  { value: "gurgaon", label: "Gurgaon" },
  { value: "greater-noida", label: "Greater Noida" },
];