"use client";

import { useEffect, useState } from "react";
import millify from "millify";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icons } from "@/components/icons";
import { fetchTokenData } from "@/services/api";
import { Skeleton } from "@/components/ui/skeleton";

interface TokenData {
    currentPrice: number | null;
    marketCap: number | null;
    dailyVolume: number | null;
    volumeMarketCapRatio: number | null;
}

const DashboardCards = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [tokenData, setTokenData] = useState<TokenData>({
        currentPrice: null,
        marketCap: null,
        dailyVolume: null,
        volumeMarketCapRatio: null,
    });

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            try {
                const data = await fetchTokenData();

                if (isMounted) {
                    setTokenData(data);
                    setLoading(false);
                }
            } catch (error) {
                setLoading(false);
                console.log(error);
            }
        };

        fetchData();

        // Cleanup function to set isMounted to false when the component unmounts
        return () => {
            isMounted = false;
        };
    }, []); // Run only once on component mount

    return (
        <div className="grid gap-4 grid-cols-1 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Current Price
                    </CardTitle>
                    <Icons.dollar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="lg:text-lg xl:text-2xl font-bold">
                        {loading ? (
                            <Skeleton className="h-[32px] w-[65px]" />
                        ) : (
                            `${
                                tokenData?.currentPrice !== null
                                    ? `${tokenData?.currentPrice.toLocaleString()}`
                                    : "-"
                            }`
                        )}
                    </div>
                    <p className="text-xs text-muted-foreground">USD</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Market Cap
                    </CardTitle>
                    <Icons.bank className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="lg:text-lg xl:text-2xl font-bold">
                        {loading ? (
                            <Skeleton className="h-[32px] w-[60px]" />
                        ) : (
                            `${
                                tokenData?.marketCap !== null
                                    ? `${millify(tokenData?.marketCap)}`
                                    : "-"
                            }`
                        )}
                    </div>
                    <p className="text-xs text-muted-foreground">USD</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Volume (24h)
                    </CardTitle>
                    <Icons.fire className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="lg:text-lg xl:text-2xl font-bold">
                        {loading ? (
                            <Skeleton className="h-[32px] w-[80px]" />
                        ) : (
                            `${
                                tokenData?.dailyVolume !== null
                                    ? `${millify(tokenData?.dailyVolume)}`
                                    : "-"
                            }`
                        )}
                    </div>
                    <p className="text-xs text-muted-foreground">USD</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Volume/Market Cap{" "}
                    </CardTitle>
                    <Icons.activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="lg:text-lg xl:text-2xl font-bold">
                        {loading ? (
                            <Skeleton className="h-[32px] w-[50px]" />
                        ) : (
                            `${
                                tokenData?.volumeMarketCapRatio?.toFixed(2) !==
                                undefined
                                    ? `${tokenData?.volumeMarketCapRatio?.toFixed(
                                          2
                                      )}`
                                    : "-"
                            }`
                        )}
                    </div>
                    <p className="text-xs text-muted-foreground">%</p>
                </CardContent>
            </Card>
        </div>
    );
};

export default DashboardCards;
