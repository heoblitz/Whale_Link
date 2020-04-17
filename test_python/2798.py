user_input = list(map(int, input().strip().split(' ')))
card_list = list(map(int, input().strip().split(' ')))

max = 0
card_max = user_input[1]

for i in range(len(card_list)):
    for j in range(i+1, len(card_list)):
        for k in range(j+1, len(card_list)):
            value = card_list[i] + card_list[j] + card_list[k]
            if value > max and value <= card_max:
                max = value

print(max)