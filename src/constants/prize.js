const PrizeKeys = {
  FIRST: "FIRST",
  SECOND: "SECOND",
  THIRD: "THIRD",
  FOURTH: "FOURTH",
  FIFTH: "FIFTH",
};

export const PRIZE = {
  [PrizeKeys.FIRST]: {
    RANK: 1,
    WINNING_CRITERIA: 6,
    REWARD: 2_000_000_000,
  },
  [PrizeKeys.SECOND]: {
    RANK: 2,
    WINNING_CRITERIA: 5,
    BONUS_MATCHED: true,
    REWARD: 30_000_000,
  },
  [PrizeKeys.THIRD]: {
    RANK: 3,
    WINNING_CRITERIA: 5,
    REWARD: 1_500_000,
  },
  [PrizeKeys.FOURTH]: {
    RANK: 4,
    WINNING_CRITERIA: 4,
    REWARD: 50_000,
  },
  [PrizeKeys.FIFTH]: {
    RANK: 5,
    WINNING_CRITERIA: 3,
    REWARD: 5_000,
  },
};
