import urllib.request

urls = [
    ('res1', 'https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQF-3PoKSpR5EvsBdobvNaMW6yBw3L2Uc4mFCg3Q_vixEilu4QvRKCYIe2s7pXOL_-PR72ZXBHdaE022hbGNgqI3Jb-v6lXJt3JsoPHzBVICqLnTSyhmI47IzytmFqeSZBeFSjB4oZVdbtlZuheFyg2UNBHq2IWsjppREDKgnBaseN617JmbCw9ICXhm3-uow5v7HYagR-b8sSQB1s4UmWsMjEqxUSKYeauSDh8HvjSp1ZuMnoxW2WuxgvXhWrCRnMxilVP-pLBGV1cv_m32Mfg2wkhQASX-CqEqbQ8QvNRhlReek0iPf_0='),
    ('res2', 'https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFD5JNyqR2B6LMdLQiFX5IR6HCIi4CcxIia1bnwSWlgAg-ptt2hyBo63YpXL5u3Pk2t2sf0gddJ0PXuhFNEqgI_rwOkNvIDyQ5lA_zbTrlDnQCssbAtJJqBY6sh4GnmWdB-_Sujj2c6CdHnl4uL00GzthlMyQEAWuP6Q20xMnxETpDxmOOYorX0vtugeeN1IaF5sR-dNJ0GLX2H3YqSjzgNQtoAKDOpFuJ6EdDuMcgzm0WurR9BwL_jlmWwtcjJaFFC'),
    ('res3', 'https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHbaB8Br6xqOLJLae1JUJz8fUbIKk0xnZ4Lhk-wlM0PHsz5vXwuWejZKEijpotyAVqPrHv8_-XGHJ4bRaLlMfWa1f1YByYrah3b_I07II62zPaqE3eQ6NfRTDMRJoLIKRIdCbUhx8M1rNTgfSpX8xtrVm3NI_islVImsji7S12Oe-CypK4iuvF7d9bs0AGxbYys25MXtR0XA0kRmcW4kmiuTQ90Ds7NJ2Zt7nsHyiNux9o0W81L2k-S3hCWHw=='),
    ('res4', 'https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFHo0FDs_owe6ciG7dKwfSIvGlKt98eVPi47yhmq9GGDj6ZQJX6wngaTaMik6Wt_v9t068FUUQLLwkinrQ-V4OecFZ5psVHKG39S4hzv-xGffwfPVvCxm_fwiTxU4OMRkvKORzg4a--Sny778MunmxdJtL4cThwq9l827duopzVpdF3k506zq5rmIeFn9uacl6U7H1WCNIRbavof5d89kIsAt_R1bpMRF8mQbixloX1IVyZEGmuJkGMiqn0-KNY8MDNLrB_YkzFDxP3eqwB3A==')
]

class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        print(f"Redirect: {newurl}")
        return None

opener = urllib.request.build_opener(NoRedirect)
for name, u in urls:
    print(f"=== {name} ===")
    try:
        opener.open(u)
    except Exception as e:
        pass
