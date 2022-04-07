# 500 100 50 10
n = 1180
count = 0

# 큰 단위의 화폐부터 차례대로 확인하기
coins_type = [500, 100, 50, 10]

for coin  in coins_type:
    count += n // coin # 동전 개수 // 몫 연산자
    n = n % coin # n %= coin
    print(count, n)

print(count) # 500 * 2 100 * 1 50 * 1 10 * 3 => 7