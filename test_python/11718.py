user_input_list = []

while True:
    try:
        user_input = input()
        user_input_list.append(user_input)
    except EOFError:
        break

for d in user_input_list:
    print(d)