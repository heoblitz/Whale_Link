coin_list = [500, 100, 50, 1]

money = int(input())

def coin_count(money, coin_list):
    coin_list.sort(reverse=True)
    use_coin_list = list()
    total_count = 0

    for coin in coin_list:
        count = money // coin
        total_count += count
        money -= coin * count
        use_coin_list.append([coin, count])

    return total_count, use_coin_list

print(coin_count(money, coin_list))