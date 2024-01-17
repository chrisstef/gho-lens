"use client";

import React, { useEffect } from "react";
import {
    incentiveDataProviderContract,
    poolDataProviderContract,
    GhoServiceContract,
} from "@/services/aaveQuery";
import {
    formatReserves,
    formatReservesAndIncentives,
    formatUserSummary,
    formatUserSummaryAndIncentives,
} from "@aave/math-utils";
import dayjs from "dayjs";

import * as markets from "@bgd-labs/aave-address-book";

const HoldingsForm: React.FC<{ userAddress: string }> = ({ userAddress }) => {
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Object containing array of pool reserves and market base currency data
                // { reservesArray, baseCurrencyData }
                const reserves =
                    await poolDataProviderContract.getReservesHumanized({
                        lendingPoolAddressProvider:
                            markets.AaveV3Ethereum.POOL_ADDRESSES_PROVIDER,
                    });

                // Fetch user-specific Aave data
                const userReserves =
                    await poolDataProviderContract.getUserReservesHumanized({
                        lendingPoolAddressProvider:
                            markets.AaveV3Ethereum.POOL_ADDRESSES_PROVIDER,
                        user: userAddress,
                    });

                // Array of incentive tokens with price feed and emission APR
                const reserveIncentives =
                    await incentiveDataProviderContract.getReservesIncentivesDataHumanized(
                        {
                            lendingPoolAddressProvider:
                                markets.AaveV3Ethereum.POOL_ADDRESSES_PROVIDER,
                        }
                    );

                // Fetch user incentives data
                const userIncentives =
                    await incentiveDataProviderContract.getUserReservesIncentivesDataHumanized(
                        {
                            lendingPoolAddressProvider:
                                markets.AaveV3Ethereum.POOL_ADDRESSES_PROVIDER,
                            user: userAddress,
                        }
                    );

                const reservesArray = reserves.reservesData;
                const baseCurrencyData = reserves.baseCurrencyData;
                const userReservesArray = userReserves.userReserves;

                const currentTimestamp = dayjs().unix();

                const formattedReserves = formatReserves({
                    reserves: reservesArray,
                    currentTimestamp,
                    marketReferenceCurrencyDecimals:
                        baseCurrencyData.marketReferenceCurrencyDecimals,
                    marketReferencePriceInUsd:
                        baseCurrencyData.marketReferenceCurrencyPriceInUsd,
                });

                const formattedReservesExtra = formatReservesAndIncentives({
                    reserves: reservesArray,
                    currentTimestamp,
                    marketReferenceCurrencyDecimals:
                        baseCurrencyData.marketReferenceCurrencyDecimals,
                    marketReferencePriceInUsd:
                        baseCurrencyData.marketReferenceCurrencyPriceInUsd,
                    reserveIncentives,
                });

                const userSummary = formatUserSummary({
                    currentTimestamp,
                    marketReferencePriceInUsd:
                        baseCurrencyData.marketReferenceCurrencyPriceInUsd,
                    marketReferenceCurrencyDecimals:
                        baseCurrencyData.marketReferenceCurrencyDecimals,
                    userReserves: userReservesArray,
                    formattedReserves,
                    userEmodeCategoryId: userReserves.userEmodeCategoryId,
                });

                const userSummaryExtra = formatUserSummaryAndIncentives({
                    currentTimestamp,
                    marketReferencePriceInUsd:
                        baseCurrencyData.marketReferenceCurrencyPriceInUsd,
                    marketReferenceCurrencyDecimals:
                        baseCurrencyData.marketReferenceCurrencyDecimals,
                    userReserves: userReservesArray,
                    formattedReserves,
                    userEmodeCategoryId: userReserves.userEmodeCategoryId,
                    reserveIncentives,
                    userIncentives,
                });

                console.log("1: formattedReserves:", formattedReserves);
                console.log(
                    "2: formattedReservesExtra:",
                    formattedReservesExtra
                );
                console.log("3: userSummary:", userSummary);
                console.log("4: userSummaryExtra:", userSummaryExtra);
                // console.log("5", GhoServiceContract);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [userAddress]);

    return <div>Markets & User Data</div>;
};

export default HoldingsForm;