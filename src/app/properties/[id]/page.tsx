"use client";

import { useState } from "react";
import { SimpleHeader as Header } from "@/components/layout/SimpleHeader";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { cn } from "@/lib/utils";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperClass } from "swiper";
import "swiper/css";
import "swiper/css/thumbs";
import Link from 'next/link'


import {
  ArrowDownToLine,
  ArrowRight,
  BadgePercent,
  Check,
  CheckCheck,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
  ChevronUp,
  Ellipsis,
  Eye,
  FlipHorizontal2,
  Heart,
  Images,
  MapPin,
  MoveUpRight,
  NotebookPen,
  Plus,
  Minus,
  Share2,
  Zap,
  MessageSquare,
  Phone,
  Star,
  UserRound,
  ThumbsUp,
  ThumbsDown,
  ArrowBigDown,
  ArrowBigUp,
  CirclePlus,
  ScanSearch,
} from "lucide-react";
import Image from "next/image";
import ViewMap from "@/components/common/ViewMap";
import Select from "react-select";
import { chartYearSelectStyles, countryCodeSelectStyles } from "@/lib/selectStyles";
import { properties } from "@/data/properties";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { SearchHeader } from "@/components/layout/SearchHeader";

const countryCodeOptions = [
  { value: "+91", label: "IND (+91)" },
  { value: "+1", label: "US (+1)" },
  { value: "+44", label: "UK (+44)" },
  { value: "+971", label: "UAE (+971)" },
  { value: "+61", label: "AUS (+61)" },
];

const property = properties[0];

const gallery = property.images;

const faqs = [
  {
    question: "What is the RERA approval status of this project?",
    answer:
      "This project is RERA approved under registration number UPRERAPRJ123456, ensuring complete legal transparency and on-time possession guarantee.",
  },
  {
    question: "What are the payment plans and EMI options available?",
    answer:
      "We offer flexible payment plans including construction-linked and subvention plans. Home loan assistance is available from 40+ partner banks with interest rates starting at 7.1%.",
  },
  {
    question: "Is the price negotiable?",
    answer:
      "Yes, the price is negotiable based on the payment plan you choose. Please get in touch with us to discuss the best possible deal.",
  },
  {
    question: "What are the amenities offered in this project?",
    answer:
      "The project includes a clubhouse, swimming pool, gym, landscaped gardens, kids play area, 24x7 security, and ample parking space.",
  },
];

const reviews = [
  {
    name: "Ritik Singh",
    rating: 5,
    date: "10 Jul 2026",
    time: "01:10 AM",
    review:
      "The property is really nice. I'm staying here now, and my experience has been great. The rooms are clean, the surroundings are peaceful, and everything is well maintained.",
  },
  {
    name: "Aman Verma",
    rating: 4,
    date: "02 Jul 2026",
    time: "06:45 PM",
    review:
      "Great location and value for money. The society is well maintained and the amenities are exactly as promised. Highly recommended for families.",
  },
  {
    name: "Priya Sharma",
    rating: 5,
    date: "28 Jun 2026",
    time: "11:30 AM",
    review:
      "Excellent property with a peaceful environment. The neighbours are friendly and the security is top notch. Definitely worth the investment.",
  },
  {
    name: "Mohit Gupta",
    rating: 3,
    date: "15 Jun 2026",
    time: "09:00 PM",
    review:
      "Decent property overall. The interiors are good but the maintenance could be improved. Location advantages make up for the minor issues.",
  },
];

const avgRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1);

const ratingDistribution = [5, 4, 3, 2, 1].map((star) => {
  const count = reviews.filter((r) => r.rating === star).length;
  return {
    star,
    percentage: Math.round((count / reviews.length) * 100),
  };
});

export default function PropertyDetailsPage() {
  const [liked, setLiked] = useState(false);
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
  const { price, originalPrice, title, chips } = property;
  const [currentSlide, setCurrentSlide] = useState(1);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [showAboutMore, setShowAboutMore] = useState(false)
  const [openFaq, setOpenFaq] = useState(0);
  const [enquiryType, setEnquiryType] = useState("Individual");
  const [countryCode, setCountryCode] = useState<{ value: string; label: string } | null>(countryCodeOptions[0]);


  const tocItems = [
    { id: "overview", label: "Overview" },
    { id: "property-details", label: "Property Details" },
    { id: "price-trends", label: "Price Trends" },
    { id: "dealer-details", label: "Dealer Details" },
    { id: "reviews", label: "Reviews" },
    { id: "faq", label: "FAQ" },
    { id: "recommendations", label: "Recommendations" },
  ];

  const tocItems2 = [
    { id: "about-property", label: "About Property" },
    { id: "amenities", label: "Amenities" },
    { id: "society", label: "Society" },
    { id: "floor-plan", label: "Floor Plan" },
    { id: "key-highlights", label: "Key Highlights" },
    { id: "why-roofin", label: "Why Roofin" },
  ];

  const semifurnished = [
    { name: "AC", value: "Full", image: "/semifurnished_icon/ac.png" },
    { name: "Bed", value: "2", image: "/semifurnished_icon/bed.png" },
    { name: "Lift", value: "1", image: "/semifurnished_icon/lift.png" },
    { name: "TV", value: "1", image: "/semifurnished_icon/tv.png" },
    { name: "Sofa", value: "1", image: "/semifurnished_icon/sofa.png" },
    { name: "Refrigerator", value: "1", image: "/semifurnished_icon/refrigerator.png" },
    { name: "Power Backup", value: "Full", image: "/semifurnished_icon/power_backup.png" },
    { name: "Bathroom", value: "2", image: "/semifurnished_icon/bathroom.png" },
    { name: "Cabinet", value: "2", image: "/semifurnished_icon/cabinet.png" },
    { name: "Stove", value: "Full", image: "/semifurnished_icon/stove.png" },
    { name: "Washing Machine", value: "1", image: "/semifurnished_icon/washing_machine.png" },
    { name: "Dining Table", value: "1", image: "/semifurnished_icon/dining_table.png" },
    { name: "Microwave", value: "0", image: "/semifurnished_icon/microwave.png" },
  ];

  const societyAmenities = [
    { name: "GYM", image: "/amenities/gym.png" },
    { name: "Swimming Pool", image: "/amenities/swimming_pool.png" },
    { name: "Gas Pipeline", image: "/amenities/gas_pipeline.png" },
    { name: "Parking", image: "/amenities/parking.png" },
    { name: "Children Park", image: "/amenities/children_park.png" },
    { name: "Club House", image: "/amenities/club_house.png" },
    { name: "24x7 Security", image: "/amenities/security.png" },
    { name: "CCTV Surveillance", image: "/amenities/cctv_surveilliance.png" },
    { name: "24x7 Water Supply", image: "/amenities/water_supply.png" },
  ];
  const society = [
    { name: "Towers", value: "3" },
    { name: "Total Units", value: "420" },
    { name: "Open Space", value: "70%" },
    { name: "Year of Trust", value: "8+" },

  ];

  const societyHighlights = [
    {
      name: "Well Maintained",
      description: "Professional Management",
      image: "/society/well_maintained.png",
    },
    {
      name: "Active Community",
      description: "Regular Events & Activities",
      image: "/society/active_community.png",
    },
    {
      name: "Clean & Green",
      description: "Hygienic & Eco-Friendly",
      image: "/society/clean_green.png",
    },
    {
      name: "Pet Friendly",
      description: "Pets Are Welcome",
      image: "/society/pet_friendly.png",
    },
  ];

  const keyHighlights = [
    { description: "Prime Location With Excellent Connectivity" },
    { description: "Well-Ventilated Home With Ample Natural Light" },
    { description: "Modern Design With Premium Fittings" },
    { description: "Vastu Compliant Home" },
    { description: "Vastu Compliant Home" },
    { description: "Gated Community With 24*7 Security" },
    { description: "Close To Schools, Hospitals & Shopping Hubs" },
  ];

  const locationAdvantages = [
    {
      name: "Metro Station",
      time: "10 Min",
      image: "/location_advantage/metro_station.png",
    },
    {
      name: "Mall",
      time: "25 Min",
      image: "/location_advantage/mall.png",
    },
    {
      name: "School",
      time: "8 Min",
      image: "/location_advantage/school.png",
    },
    {
      name: "Airport",
      time: "35 Min",
      image: "/location_advantage/airport.png",
    },
    {
      name: "Hospital",
      time: "6 Min",
      image: "/location_advantage/hospital.png",
    },
    {
      name: "Bank",
      time: "4 Min",
      image: "/location_advantage/bank.png",
    },
  ];

  const roofinBenefits = [
    {
      name: "Verified Properties",
      description: "All Properties Are Rera Verified",
      image: "/icon/verified.png",
    },
    {
      name: "Best Price Promise",
      description: "Get the best price with no hidden cost",
      image: "/icon/best_price.png",
    },
    {
      name: "After Sales Support",
      description: "We're With You Always",
      image: "/icon/support.png",
    },
  ];

  const homeLoanBanks = [
    {
      name: "SBI",
      interestRate: "7.3%",
      image: "/banks/sbi.png",
    },
    {
      name: "ICICI Bank",
      interestRate: "7.1%",
      image: "/banks/icici.png",
    },
    {
      name: "HDFC Bank",
      interestRate: "7.5%",
      image: "/banks/hdfc.png",
    },
    {
      name: "AXIS Bank",
      interestRate: "7.3%",
      image: "/banks/axis.png",
    },
    {
      name: "YES Bank",
      interestRate: "7.1%",
      image: "/banks/yesbank.png",
    },
    {
      name: "Kotak",
      interestRate: "7.5%",
      image: "/banks/kotak.png",
    },
  ];

  return (
    <>
      <SearchHeader />
      <div className="mx-auto w-full px-6 pt-6 sm:px-10">
        <div className="h-20 w-full border-b-[1px] border-gray-300 mb-3"></div>
        <ul className="flex gap-2 sm:flex-row sm:flex-wrap sm:items-center">
          {tocItems.map((item, index) => (
            <li key={item.id} className="">
              {index === 0 ? (
                <a
                  href={`#${item.id}`}
                  className="flex items-center rounded-full bg-gradient-to-r from-primary to-secondary p-[2px] shadow-sm transition-transform hover:scale-105"
                >
                  <span className="flex items-center gap-2 rounded-full bg-white px-3 py-1 text-sm font-medium text-primary">
                    <span className="flex h-4 w-4 items-center justify-center rounded-full  text-white bg-primary">
                      <Zap className="h-3 w-3" />
                    </span>
                    {item.label}
                  </span>
                </a>
              ) : (
                <a
                  href={`#${item.id}`}
                  className="flex items-center gap-2 rounded-full  px-3 py-1 text-sm font-normal text-black transition-colors border border-transparent hover:border-primary/10"
                >
                  {item.label}
                </a>
              )}
            </li>
          ))}
        </ul>
        <div className=" w-full mt-3"></div>
        <div className="flex  flex-wrap items-center justify-between gap-4 py-1 border-y-2 border-gray-300">
          <div className="flex items-center gap-3">
            <Breadcrumb
              items={[
                { label: "Home", href: "/" },
                { label: "Properties", href: "/properties" },
                { label: property.title },
              ]}
            />
            <div className="flex flex-wrap pl-4 ml-4 border-l border-gray-300 items-center gap-3">
              <button
                type="button"
                className="flex items-center gap-2 py-2 text-sm font-normal text-[12px] text-gray-800  transition-colors "
              >
                <FlipHorizontal2 className="h-4 w-4" />
                Compare
              </button>
              <button
                type="button"
                className="flex items-center gap-2 py-2 text-sm font-normal text-[12px] text-gray-800  transition-colors "
              >
                <NotebookPen className="h-4 w-4" />
                Report Property
              </button>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-full border border-gray-200 bg-gradient-to-r from-primary to-secondary px-3 py-2 text-sm font-semibold text-white shadow-sm transition-colors">
            <button
              type="button"
              className="flex items-center gap-1 text-[12px] text-white"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </button>
            <button
              type="button"
              className="flex items-center gap-1 text-[12px] text-white"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

        </div>
      </div>
      <section className="mx-auto w-full  px-6 py-10 sm:px-10">
        <div className="relative">
          <span className="absolute -left-2 top-8 z-30 flex items-center gap-2 uppercase rounded-sm bg-black px-4 py-2 text-xs font-normal text-white">
            Download Brochure
            <ArrowDownToLine className="h-3.5 w-3.5" />
          </span>

          <div className="flex gap-4">
            <div className="flex w-full shrink-0 flex-col overflow-hidden lg:w-[60%]">
              <div className="relative h-[90vh] overflow-hidden rounded-3xl">
                <Swiper
                  modules={[Thumbs]}
                  thumbs={{
                    swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
                  }}
                  loop={true}
                  onSlideChange={(swiper) => {
                    setCurrentSlide(swiper.realIndex + 1);
                  }}
                  spaceBetween={0}
                  className="h-full w-full"
                >
                  {gallery.map((src, index) => (
                    <SwiperSlide key={src} className="h-full!">
                      <div className="relative h-full w-full">
                        <Image
                          src={src}
                          alt={`${title} - ${index + 1}`}
                          fill
                          sizes="(max-width: 768px) 100vw, 45vw"
                          className="object-cover"
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
                <div className="absolute inset-x-0 top-0 z-20 flex items-start justify-between p-4">
                  <span />
                  <div className="flex flex-col items-center gap-2">
                    <button
                      type="button"
                      aria-label="Save"
                      onClick={() => setLiked((prev) => !prev)}
                      className="flex h-7 w-7 items-center justify-center rounded-full bg-white/90 shadow backdrop-blur transition-transform hover:scale-110"
                    >
                      <Heart
                        className={cn(
                          "h-4 w-4",
                          liked ? "fill-red-500 text-red-500" : "text-primary"
                        )}
                      />
                      {/* <span className="sr-only">{liked ? "Unlike" : "Like"}</span> */}
                    </button>
                    <button
                      type="button"
                      aria-label="Note"
                      className="flex h-7 w-7 items-center justify-center rounded-full bg-white/90 shadow backdrop-blur transition-transform hover:scale-110"
                    >
                      <Eye className="h-4 w-4 text-primary" />
                    </button>
                    <button
                      type="button"
                      aria-label="Share"
                      className="flex h-7 w-7 items-center justify-center rounded-full bg-white/90 shadow backdrop-blur transition-transform hover:scale-110"
                    >
                      <Share2 className="h-4 w-4 text-primary" />
                    </button>

                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 z-20 flex items-center justify-evenly gap-2 bg-primary px-5 py-3 text-xs font-normal text-white sm:text-sm">
                  <div className="absolute -top-10 left-4 z-20 rounded-md bg-black/60 px-4 py-1 text-sm font-medium text-white ">
                    {currentSlide}/{gallery.length}
                  </div>
                  <button className="flex items-center gap-2 absolute -top-12 right-5 font-medium justify-center py-2 text-xs px-3 rounded-md text-primary bg-white  transition-transform ">
                    <Images className="h-4 w-4 text-primary" />
                    View Photo gallery
                  </button>
                  <span className="flex items-center gap-2">
                    <Image src="/icon/location_away.png" alt="Location" width={16} height={16} />
                    15KM Away
                  </span>
                  <span className="h-4 w-px bg-white/40" />
                  <span className="flex items-center gap-2">
                    <Image src="/icon/rera_certified.png" alt="Location" width={16} height={16} />
                    RERA Certificate
                  </span>
                </div>
              </div>
              <Swiper
                modules={[FreeMode, Thumbs]}
                onSwiper={setThumbsSwiper}
                // loop={true}
                spaceBetween={8}
                slidesPerView="auto"
                freeMode={true}
                grabCursor={true}
                watchSlidesProgress={true}
                className="thumbs-swiper w-full !px-2 !py-2"
              >
                {gallery.map((src, index) => (
                  <SwiperSlide key={src} className="!w-auto cursor-pointer">
                    <div className="relative h-32 w-24 overflow-hidden rounded-lg border-4 border-transparent sm:w-28">
                      <Image
                        src={src}
                        alt={`${title} thumbnail ${index + 1}`}
                        fill
                        sizes="25vw"
                        className="object-cover"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            <div className="flex flex-1 flex-col">
              <div className="flex flex-wrap items-center gap-1.5 pb-2">
                {chips.map((chip) => (
                  <span
                    key={chip}
                    className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-normal text-primary border-primary border"
                  >
                    {chip}
                  </span>
                ))}
              </div>

              <div className="border-l-2 border-primary pl-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">
                      {title} Luxury 3BHK in Sector 150
                    </h1>
                    <div className="flex gap-4 ">
                      <div className="flex flex-wrap items-baseline gap-2">
                        {originalPrice && (
                          <span className="text-xl font-bold text-gray-400 line-through">
                            MRP {originalPrice}
                          </span>
                        )}
                        <span className="text-2xl font-bold text-primary">{price}</span>

                      </div>
                      <div className="mt-1 relative flex items-center gap-1 pl-2 bg-gradient-to-r from-primary to-secondary pr-8 py-.5 ">
                        <BadgePercent className="h-4 w-4 shrink-0 text-white" />
                        <span className=" text-white text-base font-semibold"> 13% Off </span>
                        <span className='h-13 w-5 bg-white absolute -top-1 -right-1 rotate-45'></span>
                      </div>

                    </div>
                  </div>
                  {/* <a
                    href={`tel:${phone}`}
                    aria-label="Call"
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-white shadow-md transition-transform hover:scale-110"
                  >
                    <PhoneCall className="h-5 w-5" />
                  </a> */}
                  <div>
                  </div>
                </div>
              </div>


              <div className="mt-5 rounded-lg border border-primary bg-white px-3 py-2">
                <div className="flex items-center gap-1 mb-2 text-gray-500">
                  <MapPin className="h-6 w-6 shrink-0 text-primary" />
                  <div className="text-gray-500">
                    <p className="text-sm"> Sector 103 , Noida Ext</p>
                    <p className="text-[10px]"> Sector 103 , Noida Ext</p>
                  </div>
                </div>
                <div className="flex gap-2 justify-start items-center">
                  <div className="bg-gradient-to-r relative overflow-hidden from-primary to-secondary px-6 py-1">
                    <span className="text-sm text-white">Nearby :</span>
                    <span className='absolute w-6 h-6 top-1 -right-4 z-10 bg-white rotate-45'></span>
                    <span className='absolute w-6 h-6 top-1 -left-4 z-10 bg-white rotate-45'></span>
                  </div>
                  <span className="bg-primary/20 rounded-sm line-clamp-1 border border-primary  px-2 py-.5 text-[10px] text-primary">FNG Express</span>
                  <span className="bg-primary/20 rounded-sm border border-primary  px-2 py-.5 text-[10px] text-primary">APEX Mutispecialty</span>
                  <Ellipsis className="text-primary h-3 w-3" />

                  <span className="text-primary bg-primary rounded-full flex justify-center items-center w-4 h-4">
                    <ArrowRight className="text-white h-3 w-3" />
                  </span>
                </div>
              </div>
              <div className="mt-3 border border-secondary border-dashed" ></div>

              <div className="mt-5 ">
                <div className="grid grid-cols-2 divide-x divide-primary/50">
                  {[
                    { value: "Ready", label: "To Move", Icon: "/icon/home.png" },
                    { value: "60%", label: "Completion", Icon: "/icon/location.png" },
                    { value: "300-400", label: "Sq.Ft.", Icon: "/icon/notes.png" },
                    { value: "300-400", label: "Sq.Ft.", Icon: "/icon/notes.png" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center justify-center gap-2 px-1 first:pl-0 last:pr-0"
                    >
                      <Image
                        src={item.Icon}
                        alt={item.label}
                        width={20}
                        height={20}
                        sizes="100vw"
                        className="h-6 w-5"
                      />
                      <div className="flex flex-col items-start">
                        <p className="text-sm font-semibold text-primary">
                          {item.value}
                        </p>
                        <span className="block text-[10px] text-gray-500">
                          {item.label}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className={cn('mt-5 flex  gap-2  border-2 border-gray-200 px-5 py-2', showFullDescription ? 'items-start rounded-xl' : 'items-center rounded-full')}>
                <div className="flex gap-1 pr-3 mr-3 border-r border-dashed border-secondary ">
                  <Image width={20} height={20} alt="" src='/icon/notes.png' />
                  <span className="leading-relaxed text-sm  text-black font-medium">Configuration</span>
                </div>

                <p className={cn("flex-1 text-sm leading-relaxed text-gray-600", showFullDescription ? "" : "line-clamp-1")}>
                  Comes with 4 bedrooms, 4 bedrooms, 4 balconies with modular
                  kitchen, spacious living and dining area, premium finishing
                  throughout.
                </p>
                <button
                  type="button"
                  onClick={() => setShowFullDescription((prev) => !prev)}
                  className="shrink-0 text-primary transition-colors hover:text-primary/70"
                  aria-expanded={showFullDescription}
                >
                  {showFullDescription ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </button>
              </div>

              <div className="mt-4 p-3 border border-red-400 rounded-xl">
                <ViewMap
                  height="250px"
                  properties={properties}
                />
              </div>

              <div className="grid grid-cols-2 gap-4 mt-8">
                <button className="col-span-2 bg-gradient-to-r relative overflow-hidden text-white flex justify-center items-center gap-2 from-primary shadow-sm to-secondary p-3 rounded-lg"> <Image src='/icon/usercall.png' width={25} height={25} alt="" /> <span className="text-lg font-medium">Call Now</span></button>

                <button className="border relative overflow-hidden text-primary flex justify-center items-center gap-2 border-primary shadow-sm  p-3 rounded-lg"><Image src='/icon/schedule.png' width={25} height={25} alt="" />  <span className="text-lg font-medium">Schedule Vist</span></button>

                <button className="border relative overflow-hidden text-secondary flex justify-center items-center gap-2 border-secondary shadow-sm  p-3 rounded-lg"><Image src='/icon/whatsapp.png' width={25} height={25} alt="" />  <span className="text-lg font-medium">WhatsApp</span></button>
              </div>






            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto w-full  px-6 pb-10 sm:px-10">
        <ul className="flex gap-2 sm:flex-row sm:flex-wrap sm:items-center border-t border-b border-gray-400 py-2">
          {tocItems2.map((item, index) => (
            <li key={item.id} className="">
              {index === 0 ? (
                <a
                  href={`#${item.id}`}
                  className="flex items-center rounded-full bg-gradient-to-r from-primary to-secondary p-[2px] shadow-sm "
                >
                  <span className="flex items-center gap-2 rounded-full  px-3 py-1 text-sm font-medium text-white">
                    {item.label}
                  </span>
                </a>
              ) : (
                <a
                  href={`#${item.id}`}
                  className="flex items-center gap-2 rounded-full  px-3 py-1 text-sm font-normal text-gray-400 transition-colors border border-transparent hover:border-primary/10"
                >
                  {item.label}
                </a>
              )}
            </li>
          ))}
        </ul>
        <div className="py-7">
          <address className="text-sm text-gray-700"><b>Address:</b> <span className="text-sm">Sector 103 , Noida Ext </span></address>
          <p className={cn("mt-2 text-sm leading-relaxed text-gray-600", showAboutMore ? "" : "line-clamp-3")}>This property faces the east direction. The floor plan additionally contains 3 bedroom(s), 2 bathrooms and 3 balconies. All in all, the flat is spread over a super built up area of 1270 sq.Ft. The property is located on the 3rd floor of a 18 floors tall building. Being a ready to move project, Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facere fuga error rerum assumenda sunt ipsa? Qui commodi dicta doloremque at quo neque a, eum, facilis suscipit ipsa corrupti possimus reiciendis.. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ab quas sunt omnis asperiores deleniti dignissimos, culpa numquam sint dolores magni, reiciendis perferendis molestias dolorem amet vitae minima tenetur quo laborum!</p>
          <button type="button" onClick={() => setShowAboutMore((prev) => !prev)} className="mt-1 text-sm font-semibold text-primary hover:text-primary/70">
            {showAboutMore ? "Less <<<" : "More >>>"}
          </button>
        </div>
        <div className="border border-dashed border-gray-400 w-full" />

      </section>
      <section className="mx-auto w-full pt-10 pb-6 sm:px-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="max-w-3xl border-l-2 border-secondary pl-2">
            <h2 className="flex gap-1  text-lg font-semibold text-primary uppercase ">
              Semifurnished
            </h2>
            <p className="text-[12px] text-gray-500 ">Furnishing Details</p>
          </div>
          <Link
            href=''
            className="group flex items-center font-normal gap-1.5  rounded-sm bg-gradient-to-r from-primary to-secondary bg-white px-3 py-1 text-white text-sm shadow-primary/20 transition-colors hover:text-secondary"
          >
            View all Amenities
          </Link>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-4 sm:grid-cols-4 lg:grid-cols-5 pb-9">
          {semifurnished.map((item) => (
            <div key={item.name} className="flex gap-2 justify-start border border-gray-200 px-3 py-2 shadow-sm rounded-md">
              <div className="bg-[#F0F6FD] h-12 w-12 justify-center items-center flex rounded-4xl" >
                <Image
                  width={20}
                  height={20}
                  src={item.image}
                  alt={item.name}
                  className="h-7 w-7"
                />
              </div>

              <div className="pl-3 ml-2 border-l flex flex-col justify-center border-gray-100">
                <p className="text-sm text-gray-500">{item.name}</p>
                <span className="text-base text-black">{item.value}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="border border-gray-400 w-full" />

        <div className="flex flex-wrap items-center justify-between gap-4 pt-10">
          <div className="max-w-3xl border-l-2 border-secondary pl-2">
            <h2 className="flex gap-1  text-lg font-semibold text-primary uppercase ">
              Amenities
            </h2>
          </div>
          <Link
            href='#'
            className=" flex items-center font-normal text-sm text-black hover:text-secondary"
          >
            Inside Paramount Floraville Society
          </Link>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-4 sm:grid-cols-4 lg:grid-cols-9 pb-9">
          {societyAmenities.map((item) => (
            <div key={item.name} className="flex gap-2 flex-col justify-between border items-center border-gray-200 px-3 pt-5 pb-2 shadow-sm rounded-lg max-h-44 bg-gradient-to-b from-white from-50% to-secondary">
              <Image
                width={70}
                height={70}
                src={item.image}
                alt={item.name}
                className="h-auto w-20"
              />
              <p className="text-[12px] text-center text-white">{item.name}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-10">
          <div className="max-w-3xl border-l-2 border-secondary pl-2">
            <h2 className="flex gap-1  text-lg font-semibold text-primary uppercase ">
              Amenities
            </h2>
          </div>
          <Link
            href='#'
            className=" flex items-center font-normal text-sm text-black hover:text-secondary"
          >
            Inside Paramount Floraville Society
          </Link>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-6 sm:grid-cols-4 lg:grid-cols-4 pb-9">
          {society.map((item) => (
            <div key={item.name} className="flex gap-2 flex-col justify-around items-center  p-4 shadow-sm rounded-md bg-secondary/10 h-28">
              <h3 className="text-secondary font-semibold text-xl">{item.value}</h3>
              <p className="text-sm text-center font-medium text-black">{item.name}</p>
            </div>
          ))}
        </div>

        <div className="mb-12  bg-gradient-to-r from-white to-secondary grid-cols-3 p-4 border border-secondary rounded-md lg:grid-cols-4 divide-x  gap-3 divide-secondary">
          <div className="grid grid-cols-3 gap-6 sm:grid-cols-4 lg:grid-cols-4 divide-x divide-secondary">
            {societyHighlights.map((item) => (
              <div key={item.name} className="flex gap-3 justify-center items-center    ">
                <Image
                  width={40}
                  height={40}
                  src={item.image}
                  alt={item.name}
                  className="h-auto w-12"
                />

                <div className="items-center">
                  <h3 className="text-black text-left font-semibold text-lg">{item.name}</h3>
                  <p className="text-[10px] text-left font-medium text-black">{item.description}</p>
                </div>

              </div>

            ))}
          </div>

        </div>

        <div className="border border-gray-400 w-full" />

        <div className="py-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="max-w-3xl border-l-2 border-secondary pl-2">
              <h2 className="flex gap-1  text-lg font-semibold text-primary uppercase ">
                Floor Plan
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
            <div className="flex justify-center md:justify-start">
              <div className="relative w-full rounded-xl flex justify-center items-center overflow-hidden border border-gray-200 ">
                <Image src='/common/floor_plan.png' width={300} height={300} alt="floor_plan" className="object-cover" />
              </div>
            </div>
            <div className="flex flex-col justify-start">
              <h2 className="text-lg font-bold text-gray-900 mb-1">3 BHK - 1350 sq.ft.</h2>
              <p className="text-sm text-gray-500 mb-4 leading-relaxed">Smartly designed layout with spacious rooms and efficient space utilization.</p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-gray-700">
                  <span className="relative flex items-center justify-center w-3 h-3 rounded-full bg-gray-500">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                  </span>
                  1 Living & Dining
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-700">
                  <span className="relative flex items-center justify-center w-3 h-3 rounded-full bg-gray-500">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                  </span>
                  1 Modular Kitchen
                </li>
              </ul>
            </div>
            <div className=" bg-[#F4F7FC] p-4  rounded-md">
              <div className="relative overflow-hidden  flex justify-center items-center ">
                <Image src='/common/floor_plan.png' width={200} height={200} alt="floor_plan" className="object-cover" />
              </div>
              <div className="w-full pt-10  grid grid-cols-2 gap-4 divide-x divide-gray-300">
                <div className="">
                  <h3 className="text-sm font-semibold text-gray-900 mb-1">3D Walkthrough</h3>
                  <p className="text-xs text-gray-500 mb-3">Experience the property virtually before you visit.</p>
                </div>
                <div className="flex justify-between items-center w-full">
                  <button className="inline-flex items-center gap-3 px-4 py-2 text-xs font-semibold text-primary border border-primary rounded-md ">
                  <ScanSearch className="w-5 h-5" />
                  <span className="font-normal">View 3D Tour</span>
                </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="py-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="max-w-3xl border-l-2 border-secondary pl-2">
              <h2 className="flex gap-1  text-lg font-semibold text-primary uppercase ">
                Key Highlights
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6 pt-8">

            <div className="p-5 rounded-md border border-gray-400">
              <ul className="gap-3 flex flex-col pb-3">
                {
                  keyHighlights.map((item, i) => {
                    return (
                      <li className="flex gap-1 text-sm font-normal text-black"> <Check className="text-secondary h-5 w-5" /> {item.description}</li>
                    )
                  })
                }

              </ul>

              <button className="flex w-full items-center text-primary font-medium justify-center gap-2 text-center rounded-md bg-primary/10 px-2 py-1">
                <span>View More</span> <ChevronsRight />
              </button>


            </div>

            <div className="p-5 rounded-md border border-gray-400">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="max-w-3xl border-l-2 border-primary pl-2">
                  <h2 className="flex gap-1  text-lg font-semibold text-secondary capitalize ">
                    Location Advantage
                  </h2>
                </div>
              </div>


              <div className="pt-4">
                <ul className="gap-3 grid grid-cols-2 pb-3">
                  {
                    locationAdvantages.map((item, i) => {
                      return (
                        <li key={item.name} className="flex gap-4 justify-start items-center p-2 ">
                          <Image
                            width={40}
                            height={40}
                            src={item.image}
                            alt={item.name}
                            className="h-auto w-8"
                          />

                          <div className="">
                            <h3 className="text-black text-left font-normal text-[12px]">{item.name}</h3>
                            <p className="text-sm text-left font-medium text-black">{item.time}</p>
                          </div>

                        </li>
                      )
                    })
                  }

                </ul>

                <button className="flex w-full items-center text-primary font-medium justify-center gap-2 text-center rounded-md bg-primary/10 px-2 py-1">
                  View on map
                </button>
              </div>


            </div>

          </div>
        </div>

        <div className="border border-gray-400 w-full" />

        <div className="py-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="max-w-3xl border-l-2 border-secondary pl-2">
              <h2 className="flex gap-1  text-lg font-semibold text-primary uppercase ">
                Why Roofin
              </h2>

            </div>

          </div>

          <div className="mt-6 grid grid-cols-3 gap-4 divide-x  divide-gray-400 pb-9">
            {roofinBenefits.map((item) => (
              <div key={item.name} className="flex gap-4 justify-center  ">
                <div className=" justify-center items-center flex " >
                  <Image
                    width={100}
                    height={100}
                    src={item.image}
                    alt={item.name}
                    className="h-16 w-16"
                  />
                </div>

                <div className=" flex flex-col justify-center border-gray-100">
                  <p className=" text-base text-black">{item.name}</p>
                  <span className="text-sm text-gray-500">{item.description}</span>
                </div>
              </div>
            ))}
          </div>
        </div>


        <div className="border border-gray-400 w-full" />

        <div className="py-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="max-w-3xl border-l-2 border-secondary pl-2">
              <h2 className="flex gap-1 text-lg font-semibold text-primary uppercase ">
                Bank Offers
              </h2>

            </div>

          </div>

          <div className="mt-6 p-6 gap-5 bg-center bg-cover rounded-md" style={{
            backgroundImage: "url('/banner/banck_banner.png')",
          }}>
            <div>
              <h2 className="text-[#AD5C2D] font-semibold text-lg capitalize mb-2">Bank Offer</h2>
              <p className="text-black text-base pb-1">Compare Home Loan Offers from 40+ Banks</p>
              <div className="flex gap-3 pb-4 text-secondary">
                <div className="flex gap-1 flex-col">
                  <span className="text-[10px]">Rate Start From</span>
                  <span className="text-base font-medium">7.1%</span>
                </div>
                <div className="flex gap-1 flex-col">
                  <span className="text-[10px]">Processing Fee</span>
                  <span className="text-base font-medium">0%</span>
                </div>
              </div>
              <p className="text-[#9C0131] text-[12px]">Our Banking Partners</p>
            </div>
            <div className="flex gap-3 pt-2">
              {homeLoanBanks.map((item) => (
                <div key={item.name} className="flex gap-4 justify-center  ">
                  <div className="flex flex-col justify-center items-center border-gray-100">
                    <Image
                      width={100}
                      height={100}
                      src={item.image}
                      alt={item.name}
                      className="h-8 "
                    />
                    <p className="text-sm pt-1 text-black"> Start at {item.interestRate}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>


        <div className="border border-gray-400 w-full" />

        <div className="py-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="max-w-3xl border-l-2 border-secondary pl-2">
              <h2 className="flex gap-1 text-lg font-semibold text-primary uppercase">
                Price Trends
              </h2>
            </div>
          </div>



          <div className="mt-6">
            <p className="pb-6 text-[12px] text-gray-500">The graph shows the quarterly average rates of properties. </p>

            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-base font-semibold text-gray-800">AVG. PROPERTY RATE</h3>
              </div>
              <div className="w-44">
                <Select
                  options={[
                    { value: "5years", label: "Last 5 Years" },
                    { value: "2years", label: "Last 2 Years" },
                    { value: "1year", label: "Last 1 Year" },
                  ]}
                  defaultValue={{ value: "5years", label: "Last 5 Years" }}
                  className="text-xs"
                  styles={chartYearSelectStyles}
                />
              </div>
            </div>

            <div className="w-full h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={[
                    { year: "2021", sec103: 32000, sec87: 28000 },
                    { year: "2022", sec103: 38000, sec87: 35000 },
                    { year: "2023", sec103: 44000, sec87: 42000 },
                    { year: "2024", sec103: 52000, sec87: 48000 },
                    { year: "2025", sec103: 58000, sec87: 54000 },
                    { year: "2026", sec103: 64000, sec87: 60000 },
                  ]}
                  margin={{ top: 10, right: 30, left: 10, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="gradientSec103" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#2563EB" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#2563EB" stopOpacity={0.02} />
                    </linearGradient>
                    <linearGradient id="gradientSec87" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#22BC90" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#22BC90" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    dataKey="year"
                    tick={{ fontSize: 12, fill: "#6b7280" }}
                    axisLine={{ stroke: "#d1d5db" }}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 12, fill: "#6b7280" }}
                    axisLine={{ stroke: "#d1d5db" }}
                    tickLine={false}
                    tickFormatter={(value) => `₹${value / 1000}K`}
                    domain={[0, 68000]}
                  />
                  <Tooltip
                    content={({ active, payload, label }) => {
                      if (!active || !payload?.length) return null;
                      return (
                        <div className="bg-white rounded-lg border border-gray-200 shadow-lg p-3 text-xs">
                          <p className="font-semibold text-gray-700 mb-2">{label}</p>
                          {payload.map((entry) => (
                            <div key={String(entry.dataKey)} className="flex items-center gap-2 mb-1">
                              <span
                                className="w-2.5 h-2.5 rounded-full"
                                style={{ backgroundColor: entry.color }}
                              />
                              <span className="text-gray-600">
                                {entry.dataKey === "sec103" ? "SEC 103, Noida" : "SEC 87, Noida"}
                              </span>
                              <span className="font-semibold text-gray-800 ml-auto">
                                ₹{Number(entry.value).toLocaleString()}/ sqft
                              </span>
                            </div>
                          ))}
                        </div>
                      );
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="sec103"
                    stroke="#22BC90"
                    strokeWidth={2.5}
                    fill="url(#gradientSec103)"
                    // dot={{ r: 4, fill: "#6366f1" }}
                    activeDot={{ r: 6 }}
                  />
                  <Area
                    type="monotone"
                    dataKey="sec87"
                    stroke="#2563EB"
                    strokeWidth={2.5}
                    fill="url(#gradientSec87)"
                    // dot={{ r: 4, fill: "#f59e0b" }}
                    activeDot={{ r: 6 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="flex justify-between items-center py-4">
            <h3 className="text-base uppercase font-medium">currently comparing</h3>
            <div className="flex items-center justify-center gap-3">
              <button className="flex justify-center gap-1 items-center text-primary">
                <CirclePlus className="w-4 h-4" />
                <span className="text-sm">
                  Compare with other Locailty
                </span>
              </button>
              <span className="h-5 bg-gray-400 w-[1px]" />
              <button className="flex justify-center gap-1 items-center text-primary">
                <CirclePlus className="w-4 h-4" />
                <span className="text-sm">
                  Compare with other Societies
                </span>
              </button>
            </div>
          </div>


          <div className="overflow-hidden mt-4 md:rounded-2xl border border-gray-300">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700 border border-gray-300">With Locality</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-700 border border-gray-300">Current Price</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-700 border border-gray-300">Last 1 Year</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-700 border border-gray-300">Last 2 Years</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-700 border border-gray-300">Last 5 Years</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-3 px-4 font-medium text-gray-700 border border-gray-300">Sec 87 Noida</td>
                    <td className="text-center py-3 px-4 border border-gray-300">₹ 11,850/Sqft</td>
                    <td className="text-center py-3 px-4 border border-gray-300">
                      <span className="text-red-600 font-semibold inline-flex items-center gap-1"><ArrowBigDown className="w-4 h-4" /> 4.4%</span>
                    </td>
                    <td className="text-center py-3 px-4 border border-gray-300">
                      <span className="text-green-600 font-semibold inline-flex items-center gap-1"><ArrowBigUp className="w-4 h-4" /> 89.6%</span>
                    </td>
                    <td className="text-center py-3 px-4 border border-gray-300">
                      <span className="text-green-600 font-semibold inline-flex items-center gap-1"><ArrowBigUp className="w-4 h-4" /> 130.1%</span>
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="py-3 px-4 font-medium text-gray-700 border border-gray-300">Sector 137 Noida</td>
                    <td className="text-center py-3 px-4 border border-gray-300">₹ 10,900/Sqft</td>
                    <td className="text-center py-3 px-4 border border-gray-300">
                      <span className="text-green-600 font-semibold inline-flex items-center gap-1"><ArrowBigUp className="w-4 h-4" /> 10.1%</span>
                    </td>
                    <td className="text-center py-3 px-4 border border-gray-300">
                      <span className="text-green-600 font-semibold inline-flex items-center gap-1"><ArrowBigUp className="w-4 h-4" /> 94.6%</span>
                    </td>
                    <td className="text-center py-3 px-4 border border-gray-300">
                      <span className="text-green-600 font-semibold inline-flex items-center gap-1"><ArrowBigUp className="w-4 h-4" /> 134.4%</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex mt-2 flex-wrap justify-between items-center mt-4 gap-3">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500 font-medium">Is this helpful?</span>
              <div className="flex items-center gap-2">
                <button className="inline-flex items-center gap-1.5 px-2 py-1.5 text-sm font-medium ">
                  <ThumbsUp className="w-3.5 h-3.5" />
                  Yes
                </button>
                <button className="inline-flex items-center gap-1.5 px-2 py-1.5 text-sm font-medium    ">
                  <ThumbsDown className="w-3.5 h-3.5" />
                  No
                </button>
              </div>
            </div>
            <Link href="/" className="inline-flex px-3 py-1.5 rounded-sm  items-center gap-1.5 text-[12px] font-medium text-primary border border-primary">
              Click for More Price Details

            </Link>
          </div>
          <div className="mt-6 p-6 gap-5 bg-center bg-cover rounded-md" style={{
            backgroundImage: "url('/banner/price_trends.png')",
          }}>
            <div className="max-w-xl rounded-md  p-6 backdrop-blur-sm">
              <h2 className="text-primary font-semibold text-base capitalize mb-2">Property Rates & Trends for every sector Listed on Roofin </h2>
              <p className="text-gray-500 text-base mb-4">Stay Updated, Invest Smart with Accurate Data.</p>

              <Link href="/" className="inline-flex items-center  py-1.5 px-3 gap-1 text-white bg-primary rounded-sm text-[12px] font-semibold hover:underline">
                View sector by Graph
                <span className="bg-white rounded-full text-primary">
                  <ArrowRight className="w-5 h-5" />
                </span>
              </Link>
            </div>

          </div>
        </div>


        <div className="border border-gray-400 w-full" />


        <div className="py-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="max-w-3xl border-l-2 border-secondary pl-2">
              <h2 className="flex gap-1 text-lg font-semibold text-primary uppercase ">
                Dealer Details
              </h2>
            </div>
          </div>

          <div className="mt-6 p-6 gap-5 border border-gray-300 rounded-md" >
            <div className="grid grid-cols-4 divide-x divide-gray-200">
              <div className="flex flex-col items-center gap-3 pr-6">
                <div className="overflow-hidden ">
                  <Image src='/icon/user_picture.png' alt='' width={180} height={200} />
                </div>
                <span className=" px-3 py-1 text-base font-semibold text-primary">Properties Listed 35</span>
              </div>
              <div className="col-span-2 flex flex-col gap-4 pl-6">
                <div className=" gap-4">
                  <div className="flex gap-2 items-center">
                    <h1 className="bg-gradient-to-b from-primary to-secondary bg-clip-text text-2xl font-bold text-transparent">
                      Jitendera Singh
                    </h1>
                    <span className=" inline-flex items-center gap-1 rounded-full bg-secondary/10 px-2 py-0.5 text-[10px] font-semibold text-secondary">
                      <CheckCheck className="h-4 w-4" /> Verified
                    </span>
                  </div>
                  <p className="text-base font-medium text-gray-500">Director Sales</p>
                </div>
                <div className="pt-5">
                  <div>
                    <b className="text-sm font-semibold text-gray-900">Localities</b>
                    <p className="text-xs leading-relaxed text-gray-700">
                      Deals in all exclusive properties across Noida.
                    </p>
                  </div>
                  <div>
                    <b className="text-sm font-semibold text-gray-900">About Terraces</b>
                    <p className="text-xs leading-relaxed text-gray-700">
                      Deals in all exclusive properties across Noida.
                    </p>
                  </div>
                  <div>
                    <b className="text-sm font-semibold text-gray-900">Address</b>
                    <p className="text-xs leading-relaxed text-gray-700">
                      401, RG Residency, Noida Sec-120, Greater Noida
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col pl-5">
                <h3 className="text-base font-semibold text-primary">Send Enquiry</h3>
                <div className="mt-2 flex flex-col gap-1.5">
                  <div>
                    <div className="mt-1 text-sm flex items-center gap-4">
                      You are
                      {["Individual", "Dealer"].map((type) => (
                        <div key={type} className="flex justify-center items-center">
                          <input
                            type="radio"
                            name="enquiryType"
                            value={type}
                            id={type}
                            checked={enquiryType === type}
                            onChange={() => setEnquiryType(type)}
                            className="h-3.5 w-3.5 accent-primary"
                          />
                          <label
                            htmlFor={type}
                            className={`flex flex-1 cursor-pointer items-center justify-center gap-2 px-1 py-1.5 text-xs font-medium transition-colors `}
                          >

                            {type}
                          </label>
                        </div>

                      ))}
                    </div>
                  </div>
                  <div>

                    <input
                      type="text"
                      placeholder="Your Name"
                      className="w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-800 outline-none transition-colors placeholder:text-gray-400 focus:border-primary"
                    />
                  </div>
                  <div>

                    <div className="mt-1 flex rounded-md border border-gray-300 transition-colors focus-within:border-primary">
                      <Select
                        instanceId="country-code"
                        options={countryCodeOptions}
                        value={countryCode}
                        onChange={(option) => setCountryCode(option)}
                        isSearchable={false}
                        menuShouldBlockScroll={false}
                        className="w-[130px] shrink-0 border-r border-gray-300"
                        styles={countryCodeSelectStyles}
                      />
                      <input
                        type="tel"
                        placeholder="Phone Number"
                        className="w-full px-3 py-2 text-sm text-gray-800 outline-none placeholder:text-gray-400"
                      />
                    </div>
                  </div>
                  <div>

                    <textarea
                      rows={3}
                      placeholder="I am interested in this property..."
                      className="mt-1 w-full resize-none  rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-800 outline-none transition-colors placeholder:text-gray-400 focus:border-primary"
                    />
                  </div>
                  <label className="flex items-start gap-2 text-[10px] leading-relaxed text-gray-500">
                    <input type="checkbox" className="mt-0.5 accent-primary" />
                    <span>
                      I agree to the <a href="#" className="text-primary">Terms &amp; Conditions</a> and{" "}
                      <a href="#" className="text-primary">Privacy Policy</a>
                    </span>
                  </label>
                  <button
                    type="button"
                    className="max-w-[160px] rounded-sm bg-primary py-2 text-[12px] font-medium text-white transition-opacity hover:opacity-90"
                  >
                    SEND EMAILS &amp; SMS
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border border-gray-400 w-full" />

        <div className="py-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="max-w-3xl border-l-2 border-secondary pl-2">
              <h2 className="flex gap-1 text-lg font-semibold text-primary uppercase ">
                About Builder
              </h2>
            </div>
          </div>

          <div className="pt-8" >
            <div className="flex gap-5 justify-start items-center divide-x divide-gray-200">
              <div className="overflow-hidden rounded-full h-28 w-28">
                <Image src='/icon/user_picture.png' alt='' width={180} height={200} />
              </div>
              <div className="h-20 w-[1px] bg-gray-300" />
              <div className="flex-1">
                <h2 className="text-lg font-semibold uppercase">GM Multiventures</h2>
                <p className="text-gray-500 text-[12px]">GM Multiventures Group is one of India’s Leading real state in Greater Noida</p>
                <div className="grid grid-cols-4 gap-8 divide-x divide-gray-300 mt-2 max-w-4xl">

                  <div className="flex flex-col ">
                    <span className="text-base font-semibold text-black">271+</span>
                    <span className="text-[12px] font-medium text-gray-700 ">projects</span>
                  </div>
                  <div className="flex flex-col ">
                    <span className="text-base font-semibold text-black">271+</span>
                    <span className="text-[12px] font-medium text-gray-700 ">projects</span>
                  </div>
                  <div className="flex flex-col ">
                    <span className="text-base font-semibold text-black">271+</span>
                    <span className="text-[12px] font-medium text-gray-700 ">projects</span>
                  </div>
                  <div className="flex flex-col ">
                    <span className="text-base font-semibold text-black">271+</span>
                    <span className="text-[12px] font-medium text-gray-700 ">projects</span>
                  </div>

                </div>
                <div className="flex item-center justify-end">
                  <Link href='/' className="flex text-[12px] items-center text-primary "><ChevronLeft className="h-5 w-5" /> <span>View Builder Project details</span></Link>
                </div>
              </div>
            </div>

          </div>
        </div>


        <div className="py-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="max-w-3xl border-l-2 border-secondary pl-2">
              <h2 className="flex gap-1  text-lg font-semibold text-primary uppercase ">
                Society Review
              </h2>

            </div>
            <Link
              href=''
              className="group flex items-center font-normal gap-1.5  rounded-sm border border-primary bg-white px-3 py-1 text-primary text-sm shadow-primary/20 transition-colors capitalize"
            >
              <Plus className="h-4 w-4" /> Review your socity/locality
            </Link>
          </div>

          <div className="mt-8 p-6 border rounded-md border-gray-400 ">
            <div className="flex gap-6 divide-x divide-gray-300">
              <div className="w-[30%] flex justify-center flex-col items-center " >
                <div className="flex items-baseline mb-2 gap-1">
                  <b className="text-4xl font-bold text-primary">{avgRating}</b>
                  <span className="text-gray-400">/5</span>
                </div>
                <div className="mt-1 flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < Math.round(Number(avgRating)) ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"}`}
                    />
                  ))}
                </div>
                <h3 className="my-1 text-sm font-semibold uppercase text-gray-700">Good rating</h3>
                <p className="capitalize text-[10px] text-gray-500">({reviews.length} Total Reviews)</p>

                <div className="mt-4  flex justify-center flex-col items-center  space-y-1 ">
                  {ratingDistribution.map(({ star, percentage }) => (
                    <div key={star} className="flex min-w-[400px] items-center gap-2">
                      <div className="h-1 w-[85%] overflow-hidden rounded-full bg-gray-200">
                        <div
                          className="h-full rounded-full bg-primary"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="  text-[10px] wra font-medium text-gray-600">{star} Star</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="w-[70%]">
                <div className="flex justify-between pb-1 text-sm font-medium text-primary">
                  <span>All Reviews ({reviews.length})</span>
                  <span className="cursor-pointer hover:underline">View All</span>
                </div>
                <div className="space-y-1 overflow-x-auto max-h-56">
                  {reviews.map((review) => (
                    <div
                      key={review.name}
                      className="py-3 "
                    >
                      <div className="flex items-start gap-3">
                        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-secondary text-white">
                          <UserRound className="h-6 w-6" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <h3 className="text-base font-semibold text-gray-900">
                              {review.name}
                            </h3>
                          </div>
                          <div className="mt-0.5 flex items-center gap-2 text-[10px] text-gray-400">
                            <div className="flex gap-0.5">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-3 w-3 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"}`}
                                />
                              ))}
                            </div>
                            <span className="h-3 w-px bg-gray-300" />
                            <span>{review.date}</span>
                            <span className="h-3 w-px bg-gray-300" />
                            <span>{review.time}</span>
                          </div>
                          <p className="mt-2 text-[12px] leading-relaxed text-black">
                            {review.review}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>


        </div>


        <div className="py-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="max-w-3xl border-l-2 border-secondary pl-2">
              <h2 className="flex gap-1 text-lg font-semibold text-primary uppercase ">
                FAQs
              </h2>
            </div>
          </div>

          <div className="flex pt-8 justify-between gap-5 ">
            <div className=" grid gap-2 w-[70%]" >
              {faqs.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div key={faq.question} className="border border-gray-300 rounded-md ">
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? -1 : index)}
                      className="flex w-full items-center justify-between gap-4 p-3 text-left hover:bg-gray-50"
                    >
                      <h3 className={`text-base font-medium ${isOpen ? "text-primary" : "text-black"}`}>
                        {faq.question}
                      </h3>
                      <span className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border transition-all ${isOpen ? "border-primary bg-primary text-white" : "border-gray-300 text-gray-500"}`}>
                        <Plus className="h-4 w-4" />
                      </span>
                    </button>
                    <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-40 pb-4" : "max-h-0"}`}>
                      <p className="px-4 text-sm text-gray-600">{faq.answer}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="w-[30%] border border-gray-300 rounded-md p-5 flex flex-col gap-3">
              <MessageSquare className="h-12 w-12 text-yellow-500" />
              <h3 className="font-medium text-lg text-black">Do you have more questions?</h3>
              <p className="text-sm text-gray-600">Find answers to the most common questions about this 3 BHK property, including pricing, amenities, location, home loans, and more.</p>
              <button className="mt-auto  bg-gradient-to-r from-primary to-secondary px-4 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90">Send a Direct Mail</button>
            </div>
          </div>

        </div>

        <div className="py-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="max-w-3xl border-l-2 border-secondary pl-2">
              <h2 className="flex gap-1 text-lg font-semibold text-primary uppercase ">
                SUGGESTION
              </h2>
            </div>
          </div>

          <div className="relative mt-6">
            <Swiper
              modules={[Navigation, FreeMode]}
              spaceBetween={20}
              slidesPerView={1}
              freeMode={true}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              navigation={{
                prevEl: ".suggestion-prev",
                nextEl: ".suggestion-next",
              }}
              className="!px-1"
            >
              {properties.map((item) => (
                <SwiperSlide key={item.title} className="!h-auto !py-2">
                  <div
                    className="group relative h-full border border-gray-200 rounded-2xl  bg-white   py-3 px-6"
                  >
                    <div className="h-8 w-8 rounded-full absolute  bg-white -left-5 top-8 border-r-2 border-gray-200"></div>
                    <div className="h-8 w-8 rounded-full absolute  bg-white -right-5 bottom-8 border-l-2 border-gray-200"></div>
                    <div className='absolute  overflow-hidden top-3 py-1 text-sm px-4 pl-6 font-medium right-0 capitalize bg-[#FDE5BF]'>
                      New Arrival
                      <span className='absolute -left-6 -top-[1px] rotate-45 bg-white h-7 w-8'></span>
                    </div>
                    <div className="flex flex-wrap pb-1 gap-2">
                      {item.chips.map((chip, index) => (
                        <span
                          key={chip}
                          className={`rounded-full border border-primary px-3 py-[2px] text-xs font-semibold ${index === 0 ? "bg-primary text-white" : "bg-primary/10 text-primary"}`}
                        >
                          {chip}
                        </span>
                      ))}
                    </div>
                    <h3 className=" text-lg font-medium  text-gray-900 line-clamp-1">
                      {item.title}
                    </h3>
                    <div className="grid pt-1 grid-cols-3 gap-3">
                      <div className="overflow-hidden rounded-lg col-span-1 max-h-[100px]">
                        <Image
                          src={item.images[0]}
                          alt={item.title}
                          width={400}
                          height={300}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <div className="col-span-2">

                        <div className="flex items-center gap-1 text-sm font-medium text-gray-500">
                          <MapPin className="h-6 w-6 text-primary" />
                          {item.location}
                        </div>

                        <div className="mt-1 flex items-baseline gap-2">
                          <span className="text-sm font-medium text-gray-400 line-through">
                            MRP  {item.originalPrice}
                          </span>
                          <span className="text-lg font-bold text-black">{item.price}</span>
                        </div>
                        <div className="w-full border-dashed border mt-2  border-gray-400" />
                        <div className="mt-2 flex justify-between  items-center">
                          <p className="text-gray-500 text-[12px]">Posted on 10 jul, 2026</p>
                          <Link
                            href="/"
                            className="inline-flex items-center rounded-md bg-gradient-to-r from-primary to-secondary px-2 py-1 text-[12px] font-medium text-white transition-opacity hover:opacity-90"
                          >
                            View Details
                            <ArrowRight className="h-4 w-4" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            <button
              type="button"
              aria-label="Previous suggestions"
              className="suggestion-prev absolute -left-4 top-1/2 z-10 hidden -translate-y-1/2 place-items-center rounded-full border border-gray-200 bg-white p-2 text-primary shadow-md hover:bg-primary hover:text-white lg:grid"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Next suggestions"
              className="suggestion-next absolute -right-4 top-1/2 z-10 hidden -translate-y-1/2 place-items-center rounded-full border border-gray-200 bg-white p-2 text-primary shadow-md hover:bg-primary hover:text-white lg:grid"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>


        <div className="py-10">
          <div className="mt-6 p-6 gap-5 bg-center bg-cover rounded-md" style={{
            backgroundImage: "url('/banner/have_q.png')",
          }}>
            <div className="max-w-xl rounded-md  p-6 backdrop-blur-sm">
              <p className="text-white text-sm">Have Questions?</p>
              <h2 className="text-white font-semibold text-base capitalize">We’re here to help you!</h2>
              <p className="text-white text-sm mb-4">Our property expects are just a call away.</p>

              <Link href="/" className="inline-flex items-center  py-1.5 px-5 gap-1 text-primary bg-white rounded-full text-[12px] font-medium hover:underline">
                <Phone className="w-4 h-4" />
                Call Now
              </Link>
            </div>

          </div>
        </div>

      </section>
    </>
  );
}
