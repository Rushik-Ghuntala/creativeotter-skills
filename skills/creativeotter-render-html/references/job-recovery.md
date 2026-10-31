# Job recovery

CreativeOtter adaptation, 2026-11-01. Follow [the runtime contract](runtime-contract.md).

| State | Action |
| --- | --- |
| Awaiting approval | This is an unstarted quote. For an explicit generation request, claim native execution or call the provider generation tool immediately. An estimate-only request stops without spending. Do not poll an unstarted quote. |
| Queued / submitting / running | Keep the same job ID. Check only when needed, following `retry_after`. Report unfinished work when a bounded check is insufficient. |
| Submission unknown | The provider may already have accepted it. Reconcile the existing job through the advertised status/support flow. Do not create a replacement. |
| Ingesting / ingestion retry | The provider output may exist. Allow storage recovery for this job; never regenerate merely to obtain a downloadable file. |
| Succeeded | Deliver the saved asset and current preview/download link. A provider URL without confirmed ingestion is not durable fulfillment. |
| Failed / rejected / cancelled | Report the actual state and known ledger evidence. A replacement requires a new quote and applicable authorization. Do not evade moderation or promise refunds. |

Retain completed assets and all relevant job IDs in a multi-step production. Resume from saved project state instead of restarting finished shots. Missing charge/refund values are unknown. Use `manage_account` activity for billing questions, not inferred balance differences.
