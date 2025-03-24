"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { localStorageUtils } from "@/lib/localStorageUtils";
import { formatDate, formatDates } from "@/lib/utils";
import { Imsakiyah as ImsakiyahType, Prayer, Time } from "@/types/imsakiyah";
import axios from "axios";
import { MapPin } from "lucide-react";
import { useEffect, useState } from "react";

export default function Imsakiyah() {
  const [location, setLocation] = useState<string>("Fetching location...");
  const [time, setTime] = useState<string>("");
  const [imsakiyah, setImsakiyah] = useState<ImsakiyahType | null>(null);
  const [prayerTime, setPrayerTime] = useState<Prayer | null>(null);
  const [loading, setLoading] = useState<{ prayerTime: boolean }>({
    prayerTime: true,
  });
  const now = new Date();

  const fetchingLocation = () => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();
          console.log(data);
          const city =
            [data.address.county, data.address.state].join(", ") ||
            "Unknown location";
          setLocation(city);
          fetchImsakiyah(`${latitude}`, `${longitude}`);
          localStorageUtils.set("location", city);
        } catch (error) {
          setLocation("Location not found");
        }
      },
      () => {
        setLocation("Location permission denied");
      }
    );
  };

  useEffect(() => {
    const savedLocation = localStorageUtils.get("location") as string;
    if (savedLocation) {
      setLocation(savedLocation);
    } else {
      fetchingLocation();
    }
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false, // Opsional
        })
      );
    };
    fetchingLocation();

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const fetchImsakiyah = async (lat: string, long: string) => {
    const response = await axios.get<ImsakiyahType>(
      `https://waktu-sholat.vercel.app/prayer?latitude=${lat}&longitude=${long}`
    );
    console.log(response.data);
    setImsakiyah(response.data);
    let d = new Date();
    let row = response.data.prayers.find((e: Prayer) => {
      return (
        e.date ==
        formatDates(`${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`)
      );
    });
    setPrayerTime(row ?? null);
    setLoading({ prayerTime: false });
  };

  return (
    <>
      <div className="bg-blue-600 dark:bg-blue-400 -mt-3 py-5 px-5">
        <div className="flex mb-3">
          <button
            className="text-sm bg-slate-100 hover:cursor-pointer flex items-center dark:bg-blue-200 px-3 py-2 rounded-full dark:text-slate-800"
            onClick={fetchingLocation}
          >
            <MapPin className="mr-1 h-4 w-4" />
            {location}
          </button>
        </div>
        <div className="flex justify-center mb-8 mt-6">
          <span className="text-white font-semibold text-6xl">
            {time.replace(".", ":")}
          </span>
        </div>
      </div>
      <div className="px-5">
        <div className="bg-white dark:bg-blue-900 px-4 py-3 shadow-md rounded-lg -mt-7">
          <h1 className="text-center mb-3 font-semibold text-lg">
            {formatDate(
              `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`
            )}
          </h1>
          <div className=" grid grid-cols-5 gap-2">
            <div className="text-slate-700 dark:text-slate-200 text-center">
              {loading.prayerTime ? (
                <Skeleton className="h-[50px] w-full" />
              ) : (
                <>
                  <span className="block text-lg font-semibold">
                    {prayerTime?.time.subuh}
                  </span>
                  <span>Shubuh</span>
                </>
              )}
            </div>
            <div className="text-slate-700 dark:text-slate-200 text-center">
              {loading.prayerTime ? (
                <Skeleton className="h-[50px] w-full" />
              ) : (
                <>
                  <span className="block text-lg font-semibold">
                    {prayerTime?.time.dzuhur}
                  </span>
                  <span>Dzuhur</span>
                </>
              )}
            </div>
            <div className="text-slate-700 dark:text-slate-200 text-center">
              {loading.prayerTime ? (
                <Skeleton className="h-[50px] w-full" />
              ) : (
                <>
                  <span className="block text-lg font-semibold">
                    {prayerTime?.time.ashar}
                  </span>
                  <span>Ashar</span>
                </>
              )}
            </div>
            <div className="text-slate-700 dark:text-slate-200 text-center">
              {loading.prayerTime ? (
                <Skeleton className="h-[50px] w-full" />
              ) : (
                <>
                  <span className="block text-lg font-semibold">
                    {prayerTime?.time.maghrib}
                  </span>
                  <span>Maghrib</span>
                </>
              )}
            </div>
            <div className="text-slate-700 dark:text-slate-200 text-center">
              {loading.prayerTime ? (
                <Skeleton className="h-[50px] w-full" />
              ) : (
                <>
                  <span className="block text-lg font-semibold">
                    {prayerTime?.time.isya}
                  </span>
                  <span>Isya</span>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="shadow-md flex flex-col gap-y-2 h-[55vh] overflow-scroll mt-7">
          {loading.prayerTime ? (
            <>
              <Skeleton className="h-[100px] mb-2 w-full" />
              <Skeleton className="h-[100px] mb-2 w-full" />
              <Skeleton className="h-[100px] mb-2 w-full" />
              <Skeleton className="h-[100px] mb-2 w-full" />
              <Skeleton className="h-[100px] mb-2 w-full" />
              <Skeleton className="h-[100px] mb-2 w-full" />
              <Skeleton className="h-[100px] mb-2 w-full" />
              <Skeleton className="h-[100px] mb-2 w-full" />
              <Skeleton className="h-[100px] mb-2 w-full" />
              <Skeleton className="h-[100px] mb-2 w-full" />
              <Skeleton className="h-[100px] mb-2 w-full" />
              <Skeleton className="h-[100px] mb-2 w-full" />
            </>
          ) : (
            imsakiyah?.prayers?.map((prayer: Prayer, index: number) => (
              <div key={index} className="mb-3">
                <h1 className="text-lg font-semibold">
                  {formatDate(prayer.date)}
                </h1>
                {Object.entries(prayer.time).map(
                  ([key, value], index2: number) => (
                    <div key={index2} className="flex items-center mb-1">
                      <span className="w-[200px] font-semibold">
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </span>
                      <span className="bg-green-600 text-white ml-auto dark:bg-green-400 dark:text-black px-1 py-[0.5] text-sm rounded-md">
                        {value}
                      </span>
                    </div>
                  )
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
