-- ============================================
-- VN Voca – Seed Data (from data.json + quiz.json)
-- ============================================

-- Foods
INSERT INTO vocabulary (slug, category, vietnamese, english_name, english_hint, description, image_url) VALUES
('bun-bo', 'food', 'Bún Bò', 'Spicy Beef Noodle Soup', 'Bun Bow', 'Spicy beef noodle soup from Huế, Central Vietnam', 'https://res.cloudinary.com/dp5foeodi/image/upload/q_auto/f_auto/v1781091778/Bun-bo_rxewd9.png'),
('pho', 'food', 'Phở', 'Noodle Soup', 'Fuh', 'Traditional rice noodle soup with beef or chicken', 'https://res.cloudinary.com/dp5foeodi/image/upload/q_auto/f_auto/v1781091778/pho_aann2q.png'),
('banh-mi', 'food', 'Bánh mì', 'Vietnamese Sandwich', 'Bang mee', 'Crispy baguette sandwich with various fillings', 'https://res.cloudinary.com/dp5foeodi/image/upload/q_auto/f_auto/v1781091778/banh-mi_afjalu.png');

INSERT INTO vocabulary (slug, category, vietnamese, english_name, english_hint, description, image_url) VALUES
('bun-rieu', 'food', 'Bún riêu', 'Crab Noodle Soup', 'Boon Real', 'Rice noodle soup with tomato-based broth and crab paste', 'https://res.cloudinary.com/dp5foeodi/image/upload/q_auto/f_auto/v1781150245/bun-rieu-cua_qmptts.png'),
('banh-cuon', 'food', 'Bánh cuốn', 'Steamed Rice Rolls', 'Bang goon', 'Thin steamed rice rolls filled with minced pork and wood ear mushrooms', 'https://res.cloudinary.com/dp5foeodi/image/upload/q_auto/f_auto/v1781150930/banh-cuon_uqlydc.png'),
('nem-lui', 'food', 'Nem nướng', 'Lemongrass Skewers', 'Ne(ver) M(an) N(ever) Wong', 'Grilled pork skewers with lemongrass, served with rice paper and herbs', 'https://res.cloudinary.com/dp5foeodi/image/upload/q_auto/f_auto/v1781150394/nem-lui_f2yvjb.png'),
('che', 'food', 'Chè', 'Sweet Soup / Dessert', 'Che(ss)', 'Vietnamese sweet dessert soup with beans, fruits, and coconut milk', 'https://res.cloudinary.com/dp5foeodi/image/upload/q_auto/f_auto/v1781150718/che_nok9yu.png'),
('bun-dau-mam-tom', 'food', 'Bún đậu mắm tôm', 'Noodle with Tofu & Shrimp Paste', 'Bun(ny) Dow(jones) Mum(my) Tom(cat)', 'Rice noodles served with fried tofu, pork, and fermented shrimp paste', 'https://res.cloudinary.com/dp5foeodi/image/upload/q_auto/f_auto/v1781151303/bun-dau-mam-tom_daublm.png'),
('ca-kho-to', 'food', 'Cá kho tộ', 'Caramelized Fish in Clay Pot', 'Car(pet) Koh(i) To(e)', 'Fish braised in a sweet and savory caramel sauce', 'https://res.cloudinary.com/dp5foeodi/image/upload/q_auto/f_auto/v1781150100/ca-kho-to_ztbobz.png'),
('thit-kho-trung', 'food', 'Thịt kho trứng', 'Braised Pork with Eggs', 'Tit(ter) Coh(ort) Trung(kingdom)', 'Pork belly and hard-boiled eggs braised in coconut juice', 'https://res.cloudinary.com/dp5foeodi/image/upload/q_auto/f_auto/v1781149916/thit-kho-trung_hidojj.png'),
('ga-tan', 'food', 'Gà tần', 'Stewed Chicken with Herbs', 'Ga(rage) Tun(a)', 'Chicken stewed with medicinal herbs, often served as a tonic soup', 'https://res.cloudinary.com/dp5foeodi/image/upload/q_auto/f_auto/v1781151303/bun-dau-mam-tom_daublm.png'),
('banh-beo', 'food', 'Bánh bèo', 'Water Fern Cake', 'Bang (kok) Be (l) (a) O (range)', 'Small steamed rice cakes topped with shredded shrimp, scallion oil, and crispy pork skin', 'https://res.cloudinary.com/dp5foeodi/image/upload/q_auto/f_auto/v1781508937/banh-beo_boepqp.png'),
('banh-bot-loc', 'food', 'Bánh bột lọc', 'Tapioca Dumpling', 'Bang (kok) Bought (l) Loc (k) (h)', 'Chewy tapioca dumplings filled with shrimp and pork, wrapped in banana leaves', 'https://res.cloudinary.com/dp5foeodi/image/upload/q_auto/f_auto/v1781508785/banh-bot-loc_skdgvl.png'),
('com-ga', 'food', 'Cơm gà', 'Chicken Rice', 'Koom (sky) Ga (rage)', 'Steamed chicken served with fragrant rice, shredded cabbage, and ginger-fish sauce', 'https://res.cloudinary.com/dp5foeodi/image/upload/q_auto/f_auto/v1781508992/com-ga_iyfrdx.png'),
('chao-suon', 'food', 'Cháo sườn', 'Pork Rib Porridge', 'Chow (mein) S (uit) (again) N (or)', 'Rice porridge cooked with pork ribs, often served with fried dough sticks', 'https://res.cloudinary.com/dp5foeodi/image/upload/q_auto/f_auto/v1781509045/chao-suon_fwdbpu.png'),
('mi-xao-hai-san', 'food', 'Mì xào hải sản', 'Seafood Stir-fried Noodles', 'Mee (k) X (ray) (a) Ow (l) High (tea) Sun (n)', 'Egg noodles stir-fried with shrimp, squid, vegetables, and soy sauce', 'https://res.cloudinary.com/dp5foeodi/image/upload/q_auto/f_auto/v1781509105/mi-xao-hai-san_rtn3c8.png'),
('canh-ga-chien-mam', 'food', 'Cánh gà chiên mắm', 'Fish Sauce Fried Chicken Wings', 'Kang (aroo) Ga (rage) Che (ck) (e) N (o) Mam (ma)', 'Chicken wings marinated in fish sauce and deep-fried until crispy', 'https://res.cloudinary.com/dp5foeodi/image/upload/q_auto/f_auto/v1781509222/ga-chien-mam_aaju3m.png'),
('banh-trang-tron', 'food', 'Bánh tráng trộn', 'Mixed Rice Paper', 'Bang (kok) Trang (gle) (x) Tr (ip) (a) (w) N (one)', 'Shredded rice paper mixed with dried beef, quail eggs, herbs, and tamarind sauce', 'https://res.cloudinary.com/dp5foeodi/image/upload/q_auto/f_auto/v1781509347/banh-trang-tron_sojvxj.png'),
('ha-cao', 'food', 'Há cảo', 'Vietnamese Dumpling', 'Ha (t) Cow (boy)', 'Steamed dumplings filled with pork, shrimp, and wood ear mushrooms', 'https://res.cloudinary.com/dp5foeodi/image/upload/q_auto/f_auto/v1781509361/ha-cao_bcrtvq.png'),
('bun-mam', 'food', 'Bún mắm', 'Fermented Fish Noodle Soup', 'Bun (ny) Mam (ma)', 'Rice noodles in a pungent broth made from fermented fish, with roasted pork, shrimp, and eggplants', 'https://res.cloudinary.com/dp5foeodi/image/upload/q_auto/f_auto/v1781509487/bun-mam_qgyr6h.png'),
('xoi-man', 'food', 'Xôi mặn', 'Savory Sticky Rice', 'Soy (bean) Man (ly)', 'Sticky rice topped with savory ingredients like shredded chicken, pork floss, fried shallots, and mung bean', 'https://res.cloudinary.com/dp5foeodi/image/upload/q_auto/f_auto/v1781509699/xoi-man_a2urgm.png'),
('xoi-ngot', 'food', 'Xôi ngọt', 'Sweet Sticky Rice', 'Soy (bean) Naught (y)', 'Sticky rice cooked with coconut milk and sugar, often served with mung bean, peanuts, or fruits', 'https://res.cloudinary.com/dp5foeodi/image/upload/q_auto/f_auto/v1781509718/xoi-ngot_molkof.png');

-- Drinks
INSERT INTO vocabulary (slug, category, vietnamese, english_name, english_hint, description, image_url) VALUES
('ca-phe-sua-da', 'drink', 'Cà phê sữa đá', 'Iced Coffee with Condensed Milk', 'Ca(t) Phe(asant) Sua(v) Da(nce)', 'Vietnamese iced coffee with condensed milk', 'https://res.cloudinary.com/dp5foeodi/image/upload/q_auto/f_auto/v1781091778/ca-phe-sua-da_hkzm4h.png'),
('tra-da', 'drink', 'Trà đá', 'Iced Tea', 'Tra(ffic) Da(nce)', 'Iced tea – a common everyday drink', 'https://res.cloudinary.com/dp5foeodi/image/upload/q_auto/f_auto/v1781091778/tra-da_qy0eks.png'),
('nuoc-sam', 'drink', 'Nước sâm', 'Herbal Tea', 'Nuke(clear) Sum(o)', 'Sweet herbal tea made from various roots and herbs', 'https://res.cloudinary.com/dp5foeodi/image/upload/q_auto/f_auto/v1781151962/nuoc-sam_ih7ej5.png'),
('bia-hoi', 'drink', 'Bia hơi', 'Fresh Beer', 'Beer Hoi(ckey)', 'Light, freshly brewed draft beer, popular in street-side pubs', 'https://res.cloudinary.com/dp5foeodi/image/upload/q_auto/f_auto/v1781151585/bia-hoi_nebk5y.png'),
('nuoc-dua-tuoi', 'drink', 'Nước dừa tươi', 'Coconut Water', 'Nook (at) Dew (drop) Raw', 'Fresh coconut water, naturally sweet and refreshing', 'https://res.cloudinary.com/dp5foeodi/image/upload/q_auto/f_auto/v1781510144/dua-tuoi_p5lwrl.png'),
('sinh-to-bo', 'drink', 'Sinh tố bơ', 'Avocado Smoothie', 'Sing (ing) Toe (nail) Bo (nus)', 'Creamy avocado blended with condensed milk and ice', 'https://res.cloudinary.com/dp5foeodi/image/upload/q_auto/f_auto/v1781510114/sinh-to-bo_sl8y6h.png'),
('tra-tac', 'drink', 'Trà tắc', 'Kumquat Tea', 'Tra (ffic) Tack (le)', 'Iced tea with kumquat and honey/sugar, also called trà chanh muối', 'https://res.cloudinary.com/dp5foeodi/image/upload/q_auto/f_auto/v1781510129/tra-tac_oy7tz6.png'),
('da-xay', 'drink', 'Đá xay', 'Frozen Blended Drink', 'Da (nce) X (ray) (a) Y (es)', 'Generic term for blended ice drinks like smoothies, frappes', 'https://res.cloudinary.com/dp5foeodi/image/upload/q_auto/f_auto/v1781511330/da-xay_lyx81u.png'),
('ruou-nep', 'drink', 'Rượu nếp', 'Fermented Sticky Rice Wine', 'Zoo (keeper) Nep (al)', 'Sweet, slightly alcoholic rice wine, often eaten with mung bean', 'https://res.cloudinary.com/dp5foeodi/image/upload/q_auto/f_auto/v1781511331/ruou-nep_wt8l7b.png'),
('nuoc-cam', 'drink', 'Nước cam', 'Orange Juice', 'Nook (at) Ca (mera) M (other)', 'Freshly squeezed orange juice', 'https://res.cloudinary.com/dp5foeodi/image/upload/q_auto/f_auto/v1781511331/nuoc-cam_om0u6h.png'),
('sua-dau-nanh', 'drink', 'Sữa đậu nành', 'Soy Milk', 'Sua (v) Dow (jones) Nang (h)', 'Sweet or unsweetened soy milk, often served hot or cold', 'https://res.cloudinary.com/dp5foeodi/image/upload/q_auto/f_auto/v1781511332/sua-dau-nanh_bdkesz.png'),
('tra-sen', 'drink', 'Trà sen', 'Lotus Tea', 'Tra (ffic) Sen (ate)', 'Green tea scented with lotus blossoms', 'https://res.cloudinary.com/dp5foeodi/image/upload/q_auto/f_auto/v1781511540/tra-sen_nlkqkt.png'),
('cacao-nong', 'drink', 'Cacao nóng', 'Hot Cocoa', 'Ca (t) Cow (boy) Nong (hang)', 'Warm cocoa drink, often with condensed milk', 'https://res.cloudinary.com/dp5foeodi/image/upload/q_auto/f_auto/v1781512122/ca-cao_vauppu.png'),
('nuoc-yen', 'drink', 'Nước yến', 'Bird''s Nest Drink', 'Nook (at) Yen (dollar)', 'Premium beverage made from swiftlet nest, often sweetened', 'https://res.cloudinary.com/dp5foeodi/image/upload/q_auto/f_auto/v1781512127/nuoc-yen_gtatnw.png');

-- Pronouns
INSERT INTO vocabulary (slug, category, vietnamese, english_name, english_hint, description, "group", gender, address, context, pair) VALUES
('toi', 'pronoun', 'tôi', 'I / me (formal)', 'Toy (box)', 'Neutral, polite. Used with strangers, colleagues. Safe choice for beginners.', 'self', 'neutral', 'N/A', 'Formal, polite', 'tôi – bạn'),
('minh', 'pronoun', 'mình', 'I / me (intimate)', 'Ming (vase)', 'Friendly, intimate. Used among close friends, family, or couples.', 'self', 'neutral', 'N/A', 'Intimate, friendly', 'mình – bạn'),
('chung-toi', 'pronoun', 'chúng tôi', 'we (excluding listener)', 'Chung (king) Toy', 'We not including the person you are talking to.', 'self', 'neutral', 'N/A', 'Formal, exclusive we', 'chúng tôi – các bạn'),
('chung-minh', 'pronoun', 'chúng mình', 'we (including listener)', 'Chung Ming', 'We including both you and the listener.', 'self', 'neutral', 'N/A', 'Inclusive we', 'chúng mình – nhau'),
('anh', 'pronoun', 'anh', 'you (younger man to older man) / I (man)', 'Ang (ry)', 'Use to address an older male (brother), or a male speaker refers to himself.', 'other', 'male', 'older male', 'Respectful, family', 'anh – em'),
('chi', 'pronoun', 'chị', 'you (younger woman to older woman) / I (woman)', 'Chee (se)', 'Use to address an older female (sister), or a female speaker refers to herself.', 'other', 'female', 'older female', 'Respectful, family', 'chị – em'),
('em', 'pronoun', 'em', 'you (older to younger) / I (younger)', 'Em (ber)', 'Use to address a younger person, or a younger person referring to themselves.', 'other', 'neutral', 'younger person', 'Caring, seniority', 'anh/chị – em'),
('ban', 'pronoun', 'bạn', 'you (peer, friend)', 'Bun (ny)', 'Used among friends of the same age or social status.', 'other', 'neutral', 'peer', 'Friendly, equal', 'tôi – bạn / tớ – cậu'),
('co', 'pronoun', 'cô', 'you (middle-aged woman) / I (female teacher)', 'Coh (hort)', 'For a middle-aged woman (auntie), or a female teacher speaking of herself.', 'other', 'female', 'middle-aged woman', 'Respectful', 'cô – cháu'),
('chu', 'pronoun', 'chú', 'you (middle-aged man) / I (male)', 'Choo (choo)', 'For a middle-aged man (uncle), or a man speaking to a younger person.', 'other', 'male', 'middle-aged man', 'Respectful', 'chú – cháu'),
('bac', 'pronoun', 'bác', 'you (elder) / I (elder)', 'Bark (ing)', 'For someone older than your parents, or a senior referring to themselves.', 'other', 'neutral', 'elder', 'Very respectful', 'bác – cháu');

-- Quiz questions (insert all 50 from quiz.json)
INSERT INTO quiz_questions (question_text, options, correct_index, explanation) VALUES
('You are a young woman talking to your female best friend (same age). Which pronoun should you use to refer to yourself?', '["Tôi","Em","Tớ","Chị"]', 2, 'Tớ is commonly used among female friends of the same age to refer to oneself in a friendly, gentle manner.'),
('You meet your male professor. Which pronoun should you use to address him?', '["Bạn","Thầy","Anh","Cậu"]', 1, 'Thầy is used to address a male teacher or professor with respect.'),
('A boy is talking to his older sister. Which pair of pronouns should they use?', '["Tao – Mày","Anh – Em","Em – Anh","Tớ – Cậu"]', 2, 'The younger sibling refers to himself as em and addresses the older sibling as anh (brother) or chị (sister).'),
('Which pronoun is considered very rude if used with a stranger?', '["Tôi","Mày","Cậu","Bạn"]', 1, 'Mày is extremely intimate and rude when used with anyone other than very close friends.'),
('You are a woman talking to your boyfriend (same age). Which pronoun do you use for yourself?', '["Tôi","Em","Chị","Anh"]', 1, 'In romantic relationships, the female often calls herself em and the male anh.'),
('You are a man talking to your younger brother. Which pronoun should you use for yourself?', '["Em","Anh","Tôi","Mình"]', 1, 'An older brother refers to himself as anh when addressing a younger sibling.'),
('In a formal meeting, how should you address the audience (a group of people)?', '["Bạn","Các bạn","Quý vị","Mọi người"]', 2, 'Quý vị is a very polite and formal way to address an audience, similar to ladies and gentlemen.'),
('You are talking to your grandmother. Which pronoun should you use to refer to yourself?', '["Con","Cháu","Tôi","Em"]', 1, 'Cháu is the respectful self-reference when speaking to grandparents or elderly relatives.'),
('A teacher is talking to a student. Which pronoun should the teacher use to address the student?', '["Con","Em","Bạn","Cô/Thầy"]', 1, 'Teachers often address students as em (younger person) in a respectful and caring way.'),
('Which pronoun can be used as a neutral, safe choice in most situations?', '["Tôi","Tao","Mình","Em"]', 0, 'Tôi is the most common, neutral, and polite pronoun suitable for most situations.');
