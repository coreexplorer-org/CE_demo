export const repositoryData = {
  name: "bitcoin/bitcoin",
  description: "Bitcoin Core integration/staging tree",
  url: "https://github.com/bitcoin/bitcoin",
}

export const maintainersData = [
  {
    uuid: "m123",
    name: "Wladimir J. van der Laan",
    email: "laanwj@gmail.com",
  },
  {
    uuid: "m456",
    name: "Marco Falke",
    email: "marco.falke@tum.de",
  },
  {
    uuid: "m789",
    name: "Pieter Wuille",
    email: "pieter.wuille@gmail.com",
  },
  {
    uuid: "m101",
    name: "Andrew Chow",
    email: "achow101@gmail.com",
  },
]

export const pullRequestsData = {
  open: [
    {
      id: "pr123",
      number: 25000,
      title: "wallet: Avoid duplicate transactions in listtransactions",
      author: {
        uuid: "a123",
        name: "John Doe",
        email: "john@example.com",
      },
      openedAt: "2023-01-15T12:00:00Z",
      status: "open",
    },
    {
      id: "pr124",
      number: 25001,
      title: "net: Improve peer connection handling",
      author: {
        uuid: "a456",
        name: "Jane Smith",
        email: "jane@example.com",
      },
      openedAt: "2023-01-16T14:30:00Z",
      status: "open",
    },
  ],
  closed: [
    {
      id: "pr125",
      number: 24990,
      title: "gui: Fix transaction fee calculation",
      author: {
        uuid: "a789",
        name: "Bob Johnson",
        email: "bob@example.com",
      },
      openedAt: "2023-01-10T09:15:00Z",
      closedAt: "2023-01-12T16:45:00Z",
      status: "closed",
    },
  ],
  merged: [
    {
      id: "pr126",
      number: 24980,
      title: "consensus: Optimize block validation",
      author: {
        uuid: "a123",
        name: "John Doe",
        email: "john@example.com",
      },
      openedAt: "2023-01-05T11:30:00Z",
      mergedAt: "2023-01-08T13:20:00Z",
      status: "merged",
    },
  ],
}

export const pullRequestDetailsData = {
  pr123: {
    id: "pr123",
    number: 25000,
    title: "wallet: Avoid duplicate transactions in listtransactions",
    description:
      "This PR fixes an issue with duplicate transactions appearing in the listtransactions RPC call.\n\n**Problem:**\nWhen a transaction affects multiple addresses in the wallet, it can appear multiple times in the listtransactions output.\n\n**Solution:**\nAdd a deduplication step that ensures each transaction is only returned once.",
    author: {
      uuid: "a123",
      name: "John Doe",
      email: "john@example.com",
    },
    openedAt: "2023-01-15T12:00:00Z",
    status: "open",
  },
  pr124: {
    id: "pr124",
    number: 25001,
    title: "net: Improve peer connection handling",
    description:
      "Enhances the peer connection handling to be more resilient to network disruptions.\n\n- Adds exponential backoff for reconnection attempts\n- Improves logging of connection failures\n- Adds unit tests for the new functionality",
    author: {
      uuid: "a456",
      name: "Jane Smith",
      email: "jane@example.com",
    },
    openedAt: "2023-01-16T14:30:00Z",
    status: "open",
  },
  pr125: {
    id: "pr125",
    number: 24990,
    title: "gui: Fix transaction fee calculation",
    description:
      "Fixes a bug in the GUI where transaction fees were incorrectly calculated when using custom fee rates.",
    author: {
      uuid: "a789",
      name: "Bob Johnson",
      email: "bob@example.com",
    },
    openedAt: "2023-01-10T09:15:00Z",
    closedAt: "2023-01-12T16:45:00Z",
    status: "closed",
  },
  pr126: {
    id: "pr126",
    number: 24980,
    title: "consensus: Optimize block validation",
    description:
      "This PR optimizes the block validation process to improve performance.\n\n```\nBenchmark results:\nBefore: 1.2s per block\nAfter: 0.8s per block\n```\n\nThe optimization focuses on reducing redundant hash calculations during script verification.",
    author: {
      uuid: "a123",
      name: "John Doe",
      email: "john@example.com",
    },
    openedAt: "2023-01-05T11:30:00Z",
    mergedAt: "2023-01-08T13:20:00Z",
    status: "merged",
  },
}

export const contributorsData = {
  pr123: [
    {
      uuid: "a123",
      name: "John Doe",
      email: "john@example.com",
      contributionPercentage: 75,
    },
    {
      uuid: "a456",
      name: "Jane Smith",
      email: "jane@example.com",
      contributionPercentage: 25,
    },
  ],
  pr124: [
    {
      uuid: "a456",
      name: "Jane Smith",
      email: "jane@example.com",
      contributionPercentage: 100,
    },
  ],
  pr125: [
    {
      uuid: "a789",
      name: "Bob Johnson",
      email: "bob@example.com",
      contributionPercentage: 90,
    },
    {
      uuid: "a101",
      name: "Alice Williams",
      email: "alice@example.com",
      contributionPercentage: 10,
    },
  ],
  pr126: [
    {
      uuid: "a123",
      name: "John Doe",
      email: "john@example.com",
      contributionPercentage: 60,
    },
    {
      uuid: "a456",
      name: "Jane Smith",
      email: "jane@example.com",
      contributionPercentage: 30,
    },
    {
      uuid: "a789",
      name: "Bob Johnson",
      email: "bob@example.com",
      contributionPercentage: 10,
    },
  ],
}

export const commitsData = {
  pr123: [
    {
      id: "c123",
      hash: "a1b2c3d4e5f6",
      shortDescription: "Fix duplicate transactions in listtransactions",
      longDescription:
        "This commit fixes an issue where transactions affecting multiple addresses would appear multiple times in the listtransactions RPC output.\n\nA deduplication step is added to ensure each transaction is only returned once.",
      author: {
        uuid: "a123",
        name: "John Doe",
        email: "john@example.com",
      },
      coAuthors: [],
      createdAt: "2023-01-15T10:00:00Z",
    },
  ],
  pr124: [
    {
      id: "c124",
      hash: "b2c3d4e5f6g7",
      shortDescription: "Add exponential backoff for reconnection",
      longDescription:
        "Implements exponential backoff for peer reconnection attempts to avoid overwhelming the network during outages.",
      author: {
        uuid: "a456",
        name: "Jane Smith",
        email: "jane@example.com",
      },
      coAuthors: [],
      createdAt: "2023-01-16T12:30:00Z",
    },
    {
      id: "c125",
      hash: "c3d4e5f6g7h8",
      shortDescription: "Improve connection failure logging",
      longDescription: "Enhances the logging of connection failures to provide more diagnostic information.",
      author: {
        uuid: "a456",
        name: "Jane Smith",
        email: "jane@example.com",
      },
      coAuthors: [],
      createdAt: "2023-01-16T13:45:00Z",
    },
  ],
  pr125: [
    {
      id: "c126",
      hash: "d4e5f6g7h8i9",
      shortDescription: "Fix fee calculation in GUI",
      longDescription:
        "Fixes a bug where custom fee rates were not correctly applied in the transaction creation dialog.",
      author: {
        uuid: "a789",
        name: "Bob Johnson",
        email: "bob@example.com",
      },
      coAuthors: [
        {
          uuid: "a101",
          name: "Alice Williams",
          email: "alice@example.com",
        },
      ],
      createdAt: "2023-01-10T08:15:00Z",
    },
  ],
  pr126: [
    {
      id: "c127",
      hash: "e5f6g7h8i9j0",
      shortDescription: "Optimize script verification",
      longDescription:
        "Reduces redundant hash calculations during script verification to improve block validation performance.",
      author: {
        uuid: "a123",
        name: "John Doe",
        email: "john@example.com",
      },
      coAuthors: [
        {
          uuid: "a456",
          name: "Jane Smith",
          email: "jane@example.com",
        },
      ],
      createdAt: "2023-01-05T10:30:00Z",
    },
    {
      id: "c128",
      hash: "f6g7h8i9j0k1",
      shortDescription: "Add benchmarks for block validation",
      longDescription: "Adds benchmarks to measure the performance improvement of the optimized block validation.",
      author: {
        uuid: "a123",
        name: "John Doe",
        email: "john@example.com",
      },
      coAuthors: [
        {
          uuid: "a789",
          name: "Bob Johnson",
          email: "bob@example.com",
        },
      ],
      createdAt: "2023-01-05T11:15:00Z",
    },
  ],
}

export const reviewsData = {
  pr123: [
    {
      id: "r123",
      reviewer: {
        uuid: "r123",
        name: "Alice Johnson",
        email: "alice@example.com",
      },
      comment: "Looks good to me. The deduplication logic is clean and efficient. ACK",
      hasACK: true,
      hasNACK: false,
      createdAt: "2023-01-17T14:00:00Z",
    },
    {
      id: "r124",
      reviewer: {
        uuid: "r456",
        name: "Bob Williams",
        email: "bob@example.com",
      },
      comment: "Have you considered using a set instead of a vector for deduplication? It might be more efficient.",
      hasACK: false,
      hasNACK: false,
      createdAt: "2023-01-16T09:30:00Z",
    },
  ],
  pr124: [
    {
      id: "r125",
      reviewer: {
        uuid: "r789",
        name: "Charlie Brown",
        email: "charlie@example.com",
      },
      comment:
        "The exponential backoff implementation looks good, but I think we should cap the maximum retry interval. NACK until this is addressed.",
      hasACK: false,
      hasNACK: true,
      createdAt: "2023-01-17T11:15:00Z",
    },
  ],
  pr125: [
    {
      id: "r126",
      reviewer: {
        uuid: "r123",
        name: "Alice Johnson",
        email: "alice@example.com",
      },
      comment: "This fix works correctly. I tested with various fee rates and the calculation is now accurate. ACK",
      hasACK: true,
      hasNACK: false,
      createdAt: "2023-01-11T13:45:00Z",
    },
  ],
  pr126: [
    {
      id: "r127",
      reviewer: {
        uuid: "r456",
        name: "Bob Williams",
        email: "bob@example.com",
      },
      comment: "The optimization is impressive. I verified the benchmark results and they match what you reported. ACK",
      hasACK: true,
      hasNACK: false,
      createdAt: "2023-01-07T10:20:00Z",
    },
    {
      id: "r128",
      reviewer: {
        uuid: "r789",
        name: "Charlie Brown",
        email: "charlie@example.com",
      },
      comment: "ACK. This is a nice performance improvement with no downsides.",
      hasACK: true,
      hasNACK: false,
      createdAt: "2023-01-07T16:30:00Z",
    },
  ],
}

export const commitChangesData = {
  c123: {
    id: "c123",
    hash: "a1b2c3d4e5f6",
    changes: [
      {
        filename: "src/wallet/wallet.cpp",
        removedLines: [
          "std::vector<COutputEntry> result;",
          "for (const auto& entry : entries) {",
          "    result.push_back(entry);",
          "}",
        ],
        addedLines: [
          "std::set<uint256> seen_txids;",
          "std::vector<COutputEntry> result;",
          "for (const auto& entry : entries) {",
          "    if (seen_txids.insert(entry.txid).second) {",
          "        result.push_back(entry);",
          "    }",
          "}",
        ],
      },
    ],
  },
  c124: {
    id: "c124",
    hash: "b2c3d4e5f6g7",
    changes: [
      {
        filename: "src/net.cpp",
        removedLines: [
          "int64_t nRetryTime = 60;",
          "if (!OpenNetworkConnection(addr, false, &nRetryTime)) {",
          "    return false;",
          "}",
        ],
        addedLines: [
          "int64_t nRetryTime = std::min(60 * static_cast<int64_t>(pow(2, nAttempts)), MAX_RETRY_DELAY);",
          "if (!OpenNetworkConnection(addr, false, &nRetryTime)) {",
          "    nAttempts++;",
          "    return false;",
          "}",
        ],
      },
      {
        filename: "src/net.h",
        removedLines: [],
        addedLines: ["static const int64_t MAX_RETRY_DELAY = 24 * 60 * 60; // 1 day in seconds"],
      },
    ],
  },
  c125: {
    id: "c125",
    hash: "c3d4e5f6g7h8",
    changes: [
      {
        filename: "src/net.cpp",
        removedLines: ['LogPrint(BCLog::NET, "Failed to connect to %s\\n", addr.ToString());'],
        addedLines: [
          'LogPrint(BCLog::NET, "Failed to connect to %s: %s\\n", addr.ToString(), NetworkErrorString(nErr));',
          'LogPrint(BCLog::NET, "Retry in %d seconds\\n", nRetryTime);',
        ],
      },
    ],
  },
  c126: {
    id: "c126",
    hash: "d4e5f6g7h8i9",
    changes: [
      {
        filename: "src/qt/sendcoinsdialog.cpp",
        removedLines: [
          "CAmount nFeeRequired = 0;",
          "if (feeCalc.reason == FeeReason::FALLBACK) {",
          "    // Fee estimation failed, fallback to minimum",
          "    nFeeRequired = CWallet::GetRequiredFee(nBytes);",
          "}",
        ],
        addedLines: [
          "CAmount nFeeRequired = 0;",
          "if (feeCalc.reason == FeeReason::FALLBACK) {",
          "    // Fee estimation failed, fallback to minimum",
          "    nFeeRequired = CWallet::GetRequiredFee(nBytes);",
          "} else if (fUseCustomFee) {",
          "    nFeeRequired = customFeeRate.GetFee(nBytes);",
          "}",
        ],
      },
    ],
  },
  c127: {
    id: "c127",
    hash: "e5f6g7h8i9j0",
    changes: [
      {
        filename: "src/script/interpreter.cpp",
        removedLines: [
          "uint256 hashCache;",
          "for (const auto& op : vops) {",
          "    hashCache = Hash(op.begin(), op.end());",
          "    if (!VerifySignature(hashCache)) {",
          "        return false;",
          "    }",
          "}",
        ],
        addedLines: [
          "std::vector<uint256> hashCache;",
          "hashCache.reserve(vops.size());",
          "",
          "for (const auto& op : vops) {",
          "    hashCache.push_back(Hash(op.begin(), op.end()));",
          "}",
          "",
          "for (size_t i = 0; i < vops.size(); i++) {",
          "    if (!VerifySignature(hashCache[i])) {",
          "        return false;",
          "    }",
          "}",
        ],
      },
    ],
  },
  c128: {
    id: "c128",
    hash: "f6g7h8i9j0k1",
    changes: [
      {
        filename: "src/bench/block_validation.cpp",
        removedLines: [],
        addedLines: [
          "#include <bench/bench.h>",
          "#include <chainparams.h>",
          "#include <validation.h>",
          "",
          "static void BlockValidation(benchmark::State& state) {",
          "    const auto chainParams = CreateChainParams(CBaseChainParams::MAIN);",
          "    CBlock block = getBlock();",
          "",
          "while (state.KeepRunning()) {",
          "        bool fValid = CheckBlock(block, state);",
          "        assert(fValid);",
          "    }",
          "}",
        ],
      },
    ],
  },
}

