#!/bin/bash

# Khởi tạo biến để theo dõi thời gian commit hiện tại
# Giả sử bắt đầu từ 12:34 ngày 1 tháng 3 năm 2024
CURRENT_DATE="2023-12-19 7:11:36" # Đã chỉnh sửa định dạng ngày giờ
while true; do
  # Tính toán khoảng thời gian ngẫu nhiên từ 5 đến 9 giờ (18000 đến 32400 giây)
  RANDOM_INCREMENT=$((RANDOM % 14400 + 18000))

  # Cộng thêm khoảng thời gian ngẫu nhiên vào CURRENT_DATE
  NEW_DATE=$(date -d "@$(($(date -d "$CURRENT_DATE" +%s) + RANDOM_INCREMENT))" +"%Y-%m-%d %H:%M:%S")

  CURRENT_DATE="$NEW_DATE"

  echo "Thay đổi ngày commit hiện tại thành $NEW_DATE"

  # Amend commit hiện tại với ngày mới mà không thay đổi nội dung commit
  GIT_COMMITTER_DATE="$NEW_DATE" git commit --amend --no-edit --date "$NEW_DATE"

  # Tiếp tục quá trình rebase
  if ! git rebase --continue; then
    echo "Rebase hoàn tất hoặc xảy ra lỗi. Vui lòng kiểm tra output và xử lý thủ công nếu cần."
    break
  fi
done



# # Đặt ngày bắt đầu
# START_DATE="2024-02-01 00:00:00"

# # Lấy danh sách tất cả các commit IDs bắt đầu từ commit đầu tiên
# commit_ids=$(git rev-list --reverse HEAD)

# # Biến để theo dõi ngày cho commit tiếp theo
# current_date=$(date -d "$START_DATE" +%s)

# for commit_id in $commit_ids; do
#     # Tính toán khoảng thời gian ngẫu nhiên từ 12 giờ (43200 giây) đến 24 giờ (86400 giây)
#     random_seconds=$((RANDOM % 43200 + 43200))
#     current_date=$((current_date + random_seconds))

#     # Định dạng lại ngày để sử dụng trong git commit
#     new_date=$(date -d "@$current_date" +'%c %z')

#     # Sử dụng git filter-branch để thay đổi ngày commit
#     GIT_COMMITTER_DATE="$new_date" git filter-branch --env-filter \
#     "if [ \$GIT_COMMIT = $commit_id ]; then
#         export GIT_AUTHOR_DATE='$new_date'
#         export GIT_COMMITTER_DATE='$new_date'
#     fi" -- $commit_id^..$commit_id
# done

# echo "Đã thay đổi ngày cho tất cả các commit."
