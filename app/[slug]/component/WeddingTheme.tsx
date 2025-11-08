"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

interface Wishes {
  _id: string;
  name: string;
  content: string;
  hidden: boolean;
  time: string;
}

interface Guest {
  _id: string;
  name: string;
  slug: string;
}

export default function WeddingTheme({ slug }: { slug?: string }) {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dataWishing, setDataWishing] = useState<Wishes[]>([]);
  const [guest, setGuest] = useState<Guest | null>(null);

  useEffect(() => {
    if (!slug) return;

    const fetchGuestBySlug = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/all-guest/${slug}`
        );
        if (!response.ok) throw new Error("Guest not found");
        const data = await response.json();
        setGuest(data); // lưu dữ liệu guest
      } catch (error) {
        console.error("Lỗi khi lấy guest:", error);
      }
    };

    fetchGuestBySlug();
  }, [slug]);

  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/all-wishes`)
      .then((response) => response.json())
      .then((data) => {
        setDataWishing(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        setLoading(false);
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newWishing = {
      name,
      content,
      hidden: true,
      time: dayjs().format("HH:mm, DD/MM/YYYY"),
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/create-wishes`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newWishing),
        }
      );

      if (!response.ok) {
        throw new Error("Gửi lời chúc thất bại");
      }
      const createdWishing = await response.json();
      // Hiển thị thông báo
      setShowMessage(true);

      setDataWishing((prev) => [...prev, createdWishing]);
      setName("");
      setContent("");

      setTimeout(() => {
        setShowMessage(false);
      }, 3000);
    } catch (error) {
      console.error("Lỗi khi gửi dữ liệu:", error);
    }
  };

  return (
    <main className="max-w-[425px] bg-secondary mx-auto font-google ">
      <div className="bg-primary relative">
        <div className="section text-secondary">
          <div className="flex justify-between p-2 tracking-wider">
            <div>Save the date</div>
            <div>29 . 11 . 2025</div>
          </div>
          <div className="text-center font-local mt-3">
            <div className="text-5xl mr-20 tracking-wider">Hải Đôn</div>
            <div className="text-3xl">&</div>
            <div className="text-5xl ml-20 tracking-wider">Thu Huyền</div>
          </div>
          <div className="flex justify-center">
            <Image
              src="/images/h.png"
              alt="Picture of the author"
              width={500}
              height={400}
            />
          </div>
        </div>
        <div className="h-[0.5px] w-full bg-gray-300"></div>
        <div className="section bg-primary px-1.5 py-4  text-primary relative overflow-hidden">
          <div className="absolute -left-4 top-0">
            <Image
              src="/images/flower-left.png"
              alt="Picture of the author"
              width={100}
              height={200}
              className="block"
            />
          </div>
          <div className="absolute -right-4 bottom-[20%]">
            <Image
              src="/images/flower-right.png"
              alt="Picture of the author"
              width={90}
              height={200}
              className="block"
            />
          </div>
          <div className="bg-secondary p-1 rounded-xs">
            <div className="bg-primary p-1 rounded-xs">
              <div className="bg-secondary p-0.5 rounded-xs">
                <div className="px-1 py-6 bg-secondary rounded-xs">
                  <div className="text-center text-base mb-3">THÂN MỜI</div>
                  <div className="text-center underline decoration-1 underline-offset-2 decoration-dashed text-4xl font-local">
                    {guest?.name || "Quý khách"}
                  </div>
                  <div className="text-center text-base my-3">
                    ĐẾN DỰ HÔN LỄ CỦA HAI VỢ CHỒNG
                  </div>
                  <div className="text-center text-base">
                    vào lúc <span className="font-semibold">16:00 - Thứ 7</span>
                  </div>
                  <div className="text-3xl pt-2 text-center">29.11.2025</div>
                  <div className="text-center italic text-sm">
                    (tức ngày 10 tháng 10 năm Ất Tỵ)
                  </div>
                  <div className="flex justify-between mt-4 text-center items-center">
                    <div>
                      <div className="font-semibold">NHÀ TRAI</div>
                      <div className="text-sm">xã Đa Phúc - Hà Nội</div>
                      <div className="flex justify-center my-3">
                        <Image
                          src="/images/icon-1.png"
                          alt="icon nha trai"
                          width={40}
                          height={40}
                        />
                      </div>
                      <div className="text-center text-secondary bg-[#2B316A] rounded-xl shadow-xl">
                        <Link
                          href="https://maps.app.goo.gl/6R5RbCbmEqQbFqhc6"
                          className="my-auto block leading-7 text-sm"
                          target="_blank"
                        >
                          Xem vị trí
                        </Link>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-center">
                        <Image
                          src="/images/hy.webp"
                          alt="icon nha gai"
                          width={50}
                          height={50}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-semibold">NHÀ GÁI</div>
                      <div className="text-sm">xã Đa Phúc - Hà Nội</div>
                      <div className="flex justify-center my-3">
                        <Image
                          src="/images/icon-2.png"
                          alt="icon nha gai"
                          width={40}
                          height={40}
                        />
                      </div>
                      <div className="text-center text-secondary bg-primary rounded-xl shadow-xl">
                        <Link
                          href="https://maps.app.goo.gl/6R5RbCbmEqQbFqhc6"
                          className="my-auto block leading-7 text-sm"
                          target="_blank"
                        >
                          Xem vị trí
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="h-[0.5px] w-full bg-gray-300"></div>
        <div className="section px-2 py-4 bg-decor relative overflow-hidden">
          <div className="decor-b-l"></div>
          <div className="decor-b-r"></div>
          <div className="bg-secondary py-5 px-4 text-primary text-[15px]">
            <div className="font-medium text-xl">Xin chào!</div>
            <div className="mt-3 text-base">
              Chúng mình sẽ tổ chức đám cưới vào ngày 29.11.2025 🎉. Vừa là để
              thuận tiện hơn trong việc gửi lời mời đến bạn, và cũng vừa là vì
              chúng mình muốn tự tay làm 1 chiếc thiệp mời làm kỷ niệm trong
              ngày trọng đại 💌.
            </div>
            <div></div>
            <div className="mt-3 text-base">
              Rất mong bạn có thể dành chút thời gian đến đến chung vui, ăn uống
              hết mình và chúc phúc cho vợ chồng mình nhé 🥰. Chúng mình rất cảm
              ơn và rất mong sự hiện diện của bạn tại bữa tiệc hôm đó nhé!💕
            </div>
            <div className="mt-3 text-base">Trân trọng!</div>
          </div>
        </div>
        <div className="h-[0.5px] w-full bg-gray-300"></div>
        <div className="section p-2 mb-3">
          <div className="text-center text-xl mb-3 text-secondary">
            WE&apos;RE GETTING MARRIED
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Image
              src="/images/1.jpg"
              alt="Picture 1"
              width={500}
              height={400}
              className="block "
            />
            <Image
              src="/images/2.jpg"
              alt="Picture 2"
              width={500}
              height={500}
              className="block"
            />

            <Image
              src="/images/DSC06839.jpg"
              alt="Picture 2"
              width={500}
              height={400}
              className="block "
            />
            <Image
              src="/images/DSC06178.jpg"
              alt="Picture 4"
              width={500}
              height={500}
              className="block"
            />
            <Image
              src="/images/DSC06464.jpg"
              alt="Picture 2"
              width={500}
              height={400}
              className="block col-span-2"
            />
            <Image
              src="/images/DSC06239.jpg"
              alt="Picture 1"
              width={500}
              height={300}
              className="block"
            />
            <Image
              src="/images/DSC06864.jpg"
              alt="Picture 2"
              width={500}
              height={400}
              className="block "
            />
            {/* <Image
              src="/images/DSC06448.jpg"
              alt="Picture 1"
              width={500}
              height={300}
              className="block col-span-2"
            /> */}
          </div>
        </div>
        {/* Lưu bút */}
        <div className="h-[0.5px] w-full bg-gray-300"></div>

        <div className="wishes my-5">
          <div className="my-3">
            <div className="rounded-sm pb-4">
              <div className="text-5xl text-center font-local pt-3 text-secondary">
                Lưu bút
              </div>
              <div
                className="list p-3 border mx-5 border-gray-200 rounded-lg max-h-[330px] 
                    overflow-y-scroll 
                    [&::-webkit-scrollbar]:w-2
                    [&::-webkit-scrollbar-track]:bg-gray-100
                    [&::-webkit-scrollbar-thumb]:bg-gray-500"
              >
                {loading ? (
                  <div>loading...</div>
                ) : (
                  <div>
                    {dataWishing.map((item) => (
                      <div key={item._id}>
                        {item.hidden && (
                          <div className="item border-b border-gray-500 py-2">
                            <div className="font-semibold text-gray-200">
                              {item.name}
                            </div>
                            <div className="text-xs text-gray-300">
                              {item.time}
                            </div>
                            <div className="text-gray-200">{item.content}</div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {/* form gửi lời chúc */}
              <div className="bg-blur border border-gray-200 rounded-lg m-5 text-white ">
                <div className="text-5xl text-center font-local pt-2">
                  Chúc phúc
                </div>
                <form onSubmit={handleSubmit} className="text-primary p-3">
                  <input
                    type="text"
                    placeholder="Tên của bạn"
                    className="border text-[#292c51] border-[#292c51] focus:border-red-500 rounded-sm p-2 w-full bg-gray-100"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <textarea
                    rows={3}
                    placeholder="Lời chúc của bạn"
                    className="border text-[#292c51] border-[#292c51] rounded-sm p-2 mt-3 bg-gray-100 w-full"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="border text-secondary rounded-md p-2 mt-2 w-full bg-[#292c51]"
                  >
                    Gửi lời chúc
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Mừng cưới */}
        <div className="h-[0.5px] w-full bg-gray-300"></div>
        <div className="section m-3 px-3 py-4 overflow-hidden bg-secondary">
          <div className="text-center text-primary relative">
            <div className="absolute -right-6 -top-6 cursor-none">
              <Image
                src="/images/gift.png"
                alt="Picture of the author"
                width={100}
                height={200}
                className="block"
              />
            </div>
            <div className="font-local text-5xl">Hộp mừng cưới</div>
            <div className="">
              Cảm ơn tất cả tình cảm của mọi người đã dành cho chúng mình ạ 💕
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4 mb-2">
              <div className="bg-white grid place-content-end">
                <Image
                  src="/images/re.png"
                  alt="img groom"
                  width={170}
                  height={40}
                />
              </div>
              <div className="bg-white py-4 px-1">
                <div className="italic underline">Mừng cưới chú rể</div>
                <div className="flex justify-center mt-4 mb-3">
                  <Image
                    src="/images/r.png"
                    alt="Groom's QR Code"
                    width={100}
                    height={100}
                    className="border-2 border-blue-800"
                  />
                </div>
                <div className="">Vietcombank</div>
                <div className="">NGUYỄN HẢI ĐÔN</div>
                <div className="">1903 4853 9475</div>
              </div>

              <div className="bg-white py-4 px-1">
                <div className="italic underline">Mừng cưới cô dâu</div>
                <div className="flex justify-center mt-4 mb-3">
                  <Image
                    src="/images/r.png"
                    alt="Bride's QR Code"
                    width={100}
                    height={100}
                    className="border-2 border-blue-800"
                  />
                </div>
                <div className="">Vietcombank</div>
                <div className="">NGUYỄN THU HUYỀN</div>
                <div className="">1903 4853 9475</div>
              </div>
              <div className="bg-white">
                <Image
                  src="/images/dau.png"
                  alt="icon bride"
                  width={170}
                  height={40}
                />
              </div>
            </div>
          </div>
        </div>

        {/* footer */}
        <div className="bg-secondary text-center py-3 text-primary">
          <div className="flex justify-center">
            <Image
              src="/images/hoa.png"
              alt="Picture of the author"
              width={120}
              height={30}
              className="block"
            />
          </div>
          <div className="font-local text-5xl mr-6">Chân thành</div>
          <div className="text-2xl font-semibold ml-6 tracking-wider">
            CẢM ƠN !
          </div>
        </div>

        {/* icon donate */}
        <div className="fixed bottom-5 right-3">
          <div className="bg-[#292c51] p-3 rounded-full">
            <Image
              src="/images/v.png"
              alt="Picture of the author"
              width={30}
              height={30}
              className="block animate-[spin_7s_linear_infinite]"
            />
          </div>
        </div>

        {showMessage && (
          <div className="fixed top-8 right-3">
            <div className="mt-4 p-2 bg-green-100 text-green-700 border border-green-400 rounded">
              ✅ Gửi lời chúc thành công!
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
