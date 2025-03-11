const commitChanges = {
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
          "    while (state.KeepRunning()) {",
          "        bool fValid = CheckBlock(block, state);",
          "        assert(fValid);",
          "    }",
          "}",
        ],
      },
    ],
  },
}

export default function handler(req, res) {
  const { id } = req.query

  if (!id || !commitChanges[id]) {
    return res.status(404).json({ error: "Commit changes not found" })
  }

  res.status(200).json(commitChanges[id])
}

