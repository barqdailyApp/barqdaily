import Image from "@/components/image";

export default function LandingView() {
  return (
    <div>
      <section
        data-aos="fade-right"
        className="hero flex justify-center relative flex-col lg:flex-row md:h-screen p-8 items-center overflow-hidden"
      >
        <div className="w-full z-50 absolute left-10 top-4">
          <div className="w-96 lg:w-full flex items-center">
            <Image
              src="/assets/images/landing/logo.png"
              className="w-20 h-20"
              alt="logo"
            />
            <h1 className="ml-4">
              <span className="text-[#0A81D1] text-4xl font-bold"> برق </span>
              <span className="text-[#000000] text-4xl font-bold">ديلي </span>
            </h1>
          </div>
        </div>
        <div className="z-50 w-4/5 mt-40 lg:w-2/5 flex justify-center">
          <Image
            src="/assets/images/landing/logo.png"
            className="w-64 h-64"
            alt=""
          />
        </div>
        <div className="h-fit relative w-full lg:w-2/5">
          <div className="flex flex-col justify-start sm:pr-16">
            <h3 className="px-3 text-[#000000] z-50 my-10 flex justify-center font-medium text-right text-2xl lg:text-5xl/relaxed">
              اطلب بسهولة، في أي وقت وفي أي مكان
            </h3>
            <h4 className="px-3 text-[#FFFFFF] flex justify-center text-lg font-medium text-right z-50">
              اختبر راحة التسوق عبر الإنترنـت بسلاسة مع برق، حيث كل ما تحتاجه
              على بعـد نقـرة واحـدة. تسـوق فـي أي وقـت وفـي أي مكـان، واسمـح
              لبرق بتسهيل تجربة التسوق للمواد الغذائية بالنسبة لك.
            </h4>
          </div>
        </div>
      </section>
      <section className="p-3 my-40 grid lg:grid-cols-2 grid-cols-1">
        <div
          data-aos="fade-up"
          className="flex flex-col my-auto lg:flex-row items-start"
        >
          <div className="w-full flex justify-center flex-col items-center">
            <h3 className="text-[#000000] text-2xl w-4/5 lg:w-4/5 lg:text-4xl text-right font-medium lg:pl-20">
              ابق على اتصال، وابق على اطلاع، واستمتع براحة تتبع طلبك بسهولة
            </h3>
            <p className="text-[#666666] w-4/5 lg:w-4/5 text-lg font-medium text-right mt-8">{`
            أنت دائمًا تتحكم في رحلة التسليم الخاصة بك. شاهد تقدم طلبك على
            الخريطة في الوقت الفعلي، مما يبقيك على اطلاع ومتحمس أثناء وصوله
            إلى عتبة داركم. ولكن هذا ليس كل ما في الأمر أن "برق ديلي" يبذل
            جهدًا إضافيًا من خلال تمكين الاتصال المباشر مع موظف التوصيل الخاص
            بك. سواء كنت بحاجة إلى إرسال رسالة سريعة أو إجراء مكالمة لتقديم
            تعليمات محددة، فإن ميزات الدردشة والاتصال لدينا تضمن التواصل
            السلس. استمتع براحة البال والراحة المطلقة مع ميزة التتبع لدينا -
            لأن معرفة مكان طلبك بالضبط لم تكن سهلة على الإطلاق
          `}</p>
          </div>
        </div>
        <div
          data-aos="fade-down"
          className="flex flex-col justify-center items-center mt-10 lg:mt-0"
        >
          <div className="my-8">
            <Image src="/assets/images/landing/Group 13.png" />
          </div>
          <div className="w-full flex my-8 justify-center">
            <Image src="/assets/images/landing/0 1.svg" alt="chat" />
          </div>
        </div>
      </section>
      <section
        data-aos="fade-up"
        className="w-full grid grid-cols-1 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 my-20"
      >
        <div className="text-[#000000] font-bold text-5xl p-4 my-auto text-center sm:text-start">
          اهم ما يميزنا
        </div>
        <div className="bg-white p-4 flex flex-col items-center rounded-2xl hover:bg-[#0A81D1] text-[#000000] hover:text-white duration-300 px-4 py-36">
          <div className="p-4 bg-white rounded-2xl">
            <Image
              src="/assets/images/landing/24 hour services.svg"
              alt="Image 1"
              className="mb-2"
            />
          </div>

          <h3 className="text-lg font-medium mt-4">دعم العملاء 24/7</h3>
        </div>
        <div className="bg-white p-4 flex flex-col items-center rounded-2xl hover:bg-[#0A81D1] text-[#000000] hover:text-white duration-300 px-4 py-36">
          <div className="p-4 bg-white rounded-2xl">
            <Image
              src="/assets/images/landing/Discount.svg"
              alt="Image 2"
              className="mb-2"
            />
          </div>
          <h3 className="text-lg font-medium mt-4">الخصم الأسبوعي</h3>
        </div>
        <div className="bg-white p-4 flex flex-col items-center rounded-2xl hover:bg-[#0A81D1] text-[#000000] hover:text-white duration-300 px-4 py-36">
          <div className="p-4 bg-white rounded-2xl">
            <Image
              src="/assets/images/landing/Delivery.svg"
              alt="Image 3"
              className="mb-2"
            />
          </div>
          <h3 className="text-lg font-medium mt-4">توصيل مجاني وسريع</h3>
        </div>
        <div className="bg-white p-4 flex flex-col items-center rounded-2xl hover:bg-[#0A81D1] text-[#000000] hover:text-white duration-300 px-4 py-36">
          <div className="p-4 bg-white rounded-2xl">
            <Image
              src="/assets/images/landing/Mobile Payment.svg"
              alt="Image 4"
              className="mb-2"
            />
          </div>
          <h3 className="text-lg font-medium mt-4">ادفع من محفظتك</h3>
        </div>
      </section>
      <section
        data-aos="fade-up"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 px-10 bg-[#0A81D1] py-10 mb-20 relative"
      >
        <div className="p-4 flex flex-col lg:flex-row items-center">
          <div className="flex flex-col justify-center items-center">
            <div className="w-48 h-48 rounded-full flex justify-center bg-[#162438]">
              <Image
                src="/assets/images/landing/WhatsApp_Image_2024-03-20_at_4.08 1.svg"
                className="w-64 h-48 absolute"
              />
            </div>
            <h4 className="text-4xl text-[#000000] font-bold mt-4">
              الكوبونات
            </h4>
          </div>
          <div className="w-full xl:w-1/2 lg:ml-10 mt-8 lg:mt-0">
            <p className="font-medium text-lg text-[#000000] sm:text-right">
              احصل على مكافآت مع كل طلب! اجمع النقاط مع كل عملية شراء واستبدلها
              للحصول على خصومات وعروض حصرية
            </p>
          </div>
        </div>
        <div className="p-4 flex flex-col lg:flex-row items-center">
          <div className="w-full hidden lg:block pr-4">
            <p className="font-medium text-lg text-[#000000] text-right">
              في برق، تعتبر مستودعاتنا الواسعة مركزً ا حيويا لآلاف المنتجات، مما
              يضمن توفير تشكيلة متنوعة لتلبية كل احتياجاتك. من المواد الأساسيـة
              للمأكـولات الفاخـرة، قمنـا بتجميـع مخـزون شامل لتلبية جميــع
              الأذواق
            </p>
          </div>
          <div className="flex flex-col justify-center items-center">
            <div className="w-48 h-48 rounded-full flex justify-center items-center bg-[#162438]">
              <Image src="/assets/images/landing/CustomerNew201.png.svg" />
            </div>
            <h4 className="text-4xl text-[#000000] font-bold mt-4">
              المستودعات
            </h4>
          </div>
          <div className="w-full xl:w-1/2 block lg:hidden mt-8">
            <p className="font-medium text-lg text-center text-[#000000]">
              في برق، تعتبر مستودعاتنا الواسعة مركزً ا حيويا لآلاف المنتجات، مما
              يضمن توفير تشكيلة متنوعة لتلبية كل احتياجاتك. من المواد الأساسيـة
              للمأكـولات الفاخـرة، قمنـا بتجميـع مخـزون شامل لتلبية جميــع
              الأذواق
            </p>
          </div>
        </div>
        <div className="delivery relative p-4 flex flex-col lg:flex-row items-center">
          <div className="slide-animation hidden xl:block -top-8 left-60 absolute">
            <Image src="/assets/images/landing/truck.gif.svg" />
          </div>
          <div className="flex flex-col justify-center items-center">
            <div className="w-48 h-48 rounded-full flex justify-center items-center bg-[#162438]">
              <Image src="/assets/images/landing/supplier-box.png.svg" />
            </div>

            <h4 className="text-4xl text-[#000000] font-bold mt-4">التوصيل</h4>
          </div>
          <div className="w-full xl:w-1/2 lg:ml-10 mt-8">
            <p className="font-medium text-lg text-[#000000] text-center sm:text-right">
              ستمتع بتجربة الحصول على التسليم السريع والموثوق مع برق. يمتد
              التزامنا برضا العملاء إلى خدمتنا السريعة في التوصيل، مما يضمن وصول
              مشترياتك إلى باب منزلك بسرعة. نحن ندرك أهمية الـوقت، وشبكتنـا
              الفعـالة فـي التسليـم مصممـة لتـوفير الـوقت والجهد على حد سواء.
            </p>
          </div>
        </div>
        <div className="p-4 flex flex-col lg:flex-row items-center lg:justify-end">
          <div className="w-full md:w-1/2 hidden lg:block pr-4">
            <p className="font-medium ml-9 text-lg text-[#000000] text-right">
              اتحتاج الى مساعدة؟ فريق الدعم المخصص لدينا متاح على مدار الساعة
              للرد على أي استفسارات أو مخاوف قد تكون لديكم.
            </p>
          </div>
          <div className="flex flex-col justify-center items-center">
            <div className="w-48 h-48 rounded-full flex justify-center items-center bg-[#162438]">
              <Image src="/assets/images/landing/Customer201.png.svg" />
            </div>

            <h4 className="text-4xl text-[#000000] font-bold mt-4">
              فريق الدعم
            </h4>
          </div>
          <div className="w-full xl:w-1/2 block mt-8 lg:hidden">
            <p className="font-medium text-lg text-[#000000]">
              اتحتاج الى مساعدة؟ فريق الدعم المخصص لدينا متاح على مدار الساعة
              للرد على أي استفسارات أو مخاوف قد تكون لديكم.
            </p>
          </div>
        </div>
        <div className="absolute left-[42%] top-[235px] hidden xl:block">
          <Image src="/assets/images/landing/MOBILE-edited201.png.svg" />
        </div>
      </section>
      <section className="flex flex-col my-24 lg:flex-row justify-center items-center overflow-hidden">
        <div
          data-aos="fade-right"
          className="flex flex-col md:w-2/5 justify-center"
        >
          <p className="text-[#000000] font-medium text-lg text-center mx-auto px-4 my-14">
            يعتبــر تطبيــق بــرق، المتجــر الـرقـمــي الــذي لا يغلــق أبـوابه
            أبــدا! مفتــوح علــى مــدار 24 ســاعة، بــرق هــو وجهتــك
            الــوحيـدة لجميــع احتيـاجاتك مـن المـواد الغـذائية. مـن الخضـروات
            والفـواكه الطـازجة، نحــن هنــا لنلبــي كــل احتيــاجاتـك
          </p>
        </div>
        <div
          data-aos="fade-left"
          className="flex justify-center flex-col md:flex-row items-center lg:justify-around w-2/5"
        >
          <Image
            src="/assets/images/landing/wepik-export-20231007094647cClH 1.png"
            className="m-6 md:w-3/4"
          />
          <Image
            src="/assets/images/landing/wepik-export-20231007094647cClH 2.png"
            className="m-6 md:w-3/4"
          />
        </div>
      </section>
      <section className="last-one flex flex-col justify-center items-center pt-24">
        <div data-aos="fade-up">
          <h3 className="font-medium text-4xl text-center px-4 text-[#000000]">
            انضم إلى الآلاف من العملاء الراضين
          </h3>
          <p className="text-white font-medium text-lg w-3/4 text-center mx-auto my-14">
            برق في متناول يدك، تصفح وتسوق وتتبع طلباتك بسهولة، كل ذلك في راحة
            يدك. متاح لكل من منصات الاندرويد والايفون، قم بتحميل تطبيق برق ديلي
            اليوم واستمتع براحة التسوق عبر الإنترنت على مدار الساعة أينما كنت.
          </p>
        </div>
        <div
          data-aos="fade-up"
          className="flex flex-wrap flex-col sm:flex-row justify-center w-full mt-20"
        >
          <Image src="/assets/images/landing/appstore.svg" className="m-6" />
          <Image src="/assets/images/landing/googleplay.svg" className="m-6" />
        </div>
      </section>
      <footer className="bg-[#0A81D1] p-12">
        <div className="md:w-3/4 mx-auto">
          <div className="flex items-center justify-between mt-10 pt-8 border-t-2 border-solid border-white">
            <div className="flex gap-4">
              <a
                href="./privacy.html"
                className="font-medium text-sm text-white"
              >
                سياسة الخصوصية
              </a>
              <a
                href="./delete-account.html"
                className="font-medium text-sm text-white"
              >
                مسح الحساب
              </a>
              <h5 className="font-medium text-sm text-white">تواصل معنا</h5>
            </div>
            <div className="flex items-center">
              <a
                href="https://web.facebook.com/profile.php?id=61557421457155&mibextid=LQQJ4d&_rdc=1&_rdr"
                target="_blank"
                rel="noreferrer"
              >
                <Image src="/assets/images/landing/facebook.svg" />
              </a>
              <a
                href="https://twitter.com/BarqDaily"
                target="_blank"
                rel="noreferrer"
              >
                <Image
                  src="/assets/images/landing/twitter.svg"
                  className="mx-8"
                />
              </a>
              <a
                href="https://www.instagram.com/barqdaily/?igsh=MWFnb3VldWR1dGpreA%3D%3D"
                target="_blank"
                rel="noreferrer"
              >
                <Image src="/assets/images/landing/instgram.svg" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
